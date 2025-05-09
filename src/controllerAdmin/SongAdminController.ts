import { unlink } from "fs/promises";
import SongModel from "../model/SongModel";

import { Request, Response } from "express";
import path, { join } from "path";
import { v4 as uuidv4 } from 'uuid';

import { createWriteStream, unlinkSync } from "fs";
import { limit } from "../config/Helper";

import ContainModel from "../model/ContainModel";
import firebase from "../config/Firebase";
import googleDrive from "../config/GoogleDrive";
import { songService, userService, playListService, containService } from "../services";
type singer = {
    id: string;
    ChanalName: string;
    pathImage: string;
};

class SongAdminController {
    static song = songService
    static user = userService
    static playlist = playListService
    static contain = containService
    async Add(req: Request, res: Response) {
        var id = req.body.id
        let singer: singer[] = JSON.parse(req.body.user_id)
        let check = await Promise.all(singer.map(async (v) => {
            return await SongAdminController.user.Get(v.id)
        }))
        for (let i = 0; i < check.length; i++) {
            const element = check[i];
            if (element == undefined) {
                res.json({
                    err: true,
                    mess: "ko có ca sĩ này"
                })
                return
            }
        }
        var song = new SongModel()
        song.setAll(req.body)
        if (req.file != undefined) {
            try {
                song.SongImage = await firebase.UploadImageBuffer(`SongImage/${song.Id}`, req.file.buffer, 20000) as string
            } catch (error) {
                console.log(error);
            }
        }
        let lsPlayListArtist = await Promise.all(singer.map(async (v) => {
            return await SongAdminController.playlist.GetPlayListArtist(v.id)
        }))
        song.user_id = singer.reduce((s, f, i) => {
            if (i == singer.length - 1) {
                return `${s}${f.id}`
            }
            return `${s}${f.id} `
        }, "")
        song.Singer = singer.reduce((s, f, i) => {
            if (i == singer.length - 1) {
                return `${s}${f.ChanalName}`
            }
            return `${s}${f.ChanalName},`
        }, "")

        var c = await SongAdminController.song.Update(song)
        lsPlayListArtist.map(async (v) => {
            let con = new ContainModel()
            con.PlayList_id = v.id
            con.Song_id = song.Id
            let check = await SongAdminController.contain.Get(con)
            if (check == undefined) {
                return await SongAdminController.contain.Add(con)
            }
        })
        if (c) {
            res.json({
                err: false
            })
            return
        }
        res.json({
            err: true
        })
    }
    async Upload(req: Request, res: Response) {
        var d = (req.body.d as string).trim().split(" ")
        var f = ""
        var idSong = ""
        if (req.body.name == undefined) {
            var id = req.body.idArtist
            let check = await SongAdminController.user.Get(id)
            let check1 = await SongAdminController.playlist.GetPlayListArtist(id)
            if (check == undefined) {
                res.json({
                    err: true,
                    name: f
                })
                return
            }
            f = `song-${uuidv4()}`

            var song = new SongModel()
            var contain = new ContainModel()
            song.Genre_id = ""
            song.Id = f
            song.Singer = check.ChanalName
            song.user_id = check.id
            song.filePath = f

            contain.Song_id = f
            contain.PlayList_id = check1.id

            var fcheck = await Promise.all([SongAdminController.song.Add(song),
            SongAdminController.contain.Add(contain)])

            if (fcheck[0] == undefined || fcheck[1] == undefined) {
                res.json({
                    err: true,
                    name: f,
                })
                return
            }
        } else {
            f = req.body.name
        }
        var write = createWriteStream(path.join(process.cwd(), "/public/music", `${f}`), {
            flags: "as+"
        })
        var s = d.map((v) => {
            return parseInt(v)
        })
        var s2 = Buffer.from(s)
        write.on("close", () => {
            res.json({
                name: f,
                err: false,
                idSong: idSong
            })
        })

        write.write(s2)
        write.end(() => {

        })
    }

    async SongListAndInforArtist(req: Request, res: Response) {
        var id = req.body.idArtist
        var ls = await SongAdminController.song.GetAll(id)
        var u = await SongAdminController.user.Get(id)

        res.json({
            err: u == undefined,
            ls: ls,
            u: u
        })
    }
    async Update(req: Request, res: Response) {
        var song = new SongModel();
        song.setAll(req.body);
        // song.user_id == Đen Vâu@123@Min@123

        let singer: singer[] = JSON.parse(req.body.user_id)

        let lsPlayListArtist = await Promise.all(singer.map(async (v) => {
            return await SongAdminController.playlist.GetPlayListArtist(v.id)
        }))

        song.user_id = singer.reduce((s, f, i) => {
            if (i == singer.length - 1) {
                return `${s}${f.id}`
            }
            return `${s}${f.id} `
        }, "")
        song.Singer = singer.reduce((s, f, i) => {
            if (i == singer.length - 1) {
                return `${s}${f.ChanalName}`
            }
            return `${s}${f.ChanalName},`
        }, "")

        var oldsong = await SongAdminController.song.Get(song.Id)
        if (oldsong == undefined) {
            res.json({
                err: true
            })
            return
        }
        let d = Date.now() + ""
        if (req.file != undefined) {
            try {
                await firebase.MoveImage(`SongImage/${song.Id}`, `delete/SongImage/${song.Id}_${d}`)
                song.SongImage = await firebase.UploadImageBuffer(`SongImage/${song.Id}`, req.file.buffer, 20000) as string
            } catch (error) {
                console.log(error);
            }

        }
        var c = await SongAdminController.song.Update(song)
        lsPlayListArtist.map(async (v) => {
            let con = new ContainModel()
            con.PlayList_id = v.id
            con.Song_id = song.Id
            let check = await SongAdminController.contain.Get(con)
            if (check == undefined) {
                return await SongAdminController.contain.Add(con)
            }
            return true
        })
        if (c) {
            res.json({
                err: false
            })
            return
        }
        res.json({
            err: true
        })
    }
    async UpStatus(req: Request, res: Response) {
        var idSong = req.body.idSong
        var status = req.body.status
        var song = await SongAdminController.song.Get(idSong)

        if (song == undefined) {
            res.json({
                err: true
            })
            return
        }
        song.status = status

        var check = await SongAdminController.song.UpStatus(song)
        if (check) {
            res.json({
                err: false
            })
            return
        }
        res.json({
            err: true
        })
        return
    }
    async DeleteSong(req: Request, res: Response) {
        let id = req.body.idArtist
        let idsong = req.body.idsong
        var data = await Promise.all([
            SongAdminController.playlist.GetPlayListArtist(id),
            SongAdminController.song.Get(idsong)])

        var check = await Promise.all([SongAdminController.song.Delete(idsong),
        SongAdminController.contain.Delete(idsong, data[0].id)])
        if (data[1]?.SongImage && data[1]?.SongImage.length > 0) {
            let d = Date.now() + ""
            await firebase.MoveImage(`SongImage/${data[1].Id}`, `delete/SongImage/${data[1].Id}_${d}`)
        }
        let d = Date.now() + ""
        if (check) {
            try {
                let idfolder = await googleDrive.SearchNameFolder(data[1]?.filePath || "")
                googleDrive.Trashed(idfolder[0])
            } catch (error) {
                console.log(error);
            }
        }
        res.json({
            err: check[0] == undefined || check[1] == undefined
        })
    }
    async Get(req: Request, res: Response) {
        var idsong = req.body.idsong
        var song = await SongAdminController.song.Get(idsong)

        if (song == undefined) {
            res.json({
                err: true,
            })
            return
        }
        res.json({
            err: false,
            song: song
        })
    }
    
}

const songAdminController = new SongAdminController()

export default songAdminController