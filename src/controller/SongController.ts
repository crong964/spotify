import { unlink } from "fs/promises";
import SongModel from "../model/SongModel";

import { Request, Response } from "express";
import path, { join } from "path";
import { v4 as uuidv4 } from 'uuid';

import { createWriteStream } from "fs";
import { limit } from "../config/Helper";

import ContainModel from "../model/ContainModel";
import { songService, userService, playListService, containService } from "../services";


class SongController {
    static song = songService
    static user = userService
    static playlist = playListService
    static contain = containService
    async Update(req: Request, res: Response) {
        var id = req.cookies.id
        var u = await SongController.user.Get(id)
        var song = new SongModel()
        if (u == undefined) {
            res.json({
                err: true,
                mess: "Không có bài hát này"
            })
            return
        }
        song.setAll(req.body)
        if (song.Singer.length == 0) {
            song.Singer = u.ChanalName
        }
        if (req.file != undefined) {
            song.SongImage = "/public/image/" + req.file.filename
        }
        else {
            song.SongImage = u.pathImage
        }
        var c = await SongController.song.Update(song)
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
            var id = req.cookies.id
            let check = await SongController.user.Get(id)
            let check1 = await SongController.playlist.GetPlayListArtist(id)
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
            song.SongImage = check.pathImage
            song.filePath = f

            contain.Song_id = f
            contain.PlayList_id = check1.id

            var fcheck = await Promise.all([SongController.song.Add(song),
            SongController.contain.Add(contain)])

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
        var s = Buffer.from(d.map((v) => {
            return parseInt(v)
        }))
        write.write(s)
        write.end(() => {

        })
        res.json({
            name: f,
            err: false,
            idSong: idSong
        })
    }
    async FileSong(req: Request, res: Response) {
        if (req.file?.filename == undefined) {
            res.json({
                err: true,
                mess: "Không có file"
            })
            return
        }
        var id = req.cookies.id
        var f = uuidv4()

        let check = await SongController.user.Get(id)
        if (check == undefined) {
            res.json({
                err: true
            })
            return
        }
        f = uuidv4()
        var song = new SongModel()
        song.Genre_id = ""
        song.Id = f
        song.Singer = check.ChanalName
        song.user_id = check.id
        song.SongImage = check.pathImage
        song.filePath = req.file?.filename
        var fcheck = await SongController.song.Add(song)
        if (fcheck == undefined) {
            res.json({
                err: true

            })
            return
        }
        res.json({
            namefile: req.file?.filename,
            idSong: f
        })
    }
    async SongList(req: Request, res: Response) {
        var id = req.cookies.id


        var ls = await SongController.song.GetAll(id)
        res.json({
            err: true,
            songs: ls
        })
    }
    async GetSong(req: Request, res: Response) {
        var idsong = req.body.idsong
        var song = await SongController.song.Get(idsong)

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
    async NewUpdate(req: Request, res: Response) {
        var song = new SongModel();

        song.setAll(req.body);
        var id = req.cookies.id
        var u = await SongController.user.Get(id)
        var oldsong = await SongController.song.Get(song.Id)

        if (u == undefined || oldsong == undefined) {
            res.json({
                err: true
            })
            return
        }
        if (req.file != undefined) {
            song.SongImage = "public/image/" + req.file.filename

            oldsong.SongImage.indexOf
            if (oldsong.SongImage.indexOf("public/image/") > -1) {
                try {
                    await unlink(join(process.cwd(), oldsong.SongImage))
                } catch (error) {
                    console.log(error);

                }
            }
        }


        if (song.filePath != "" && song.filePath != oldsong.filePath) {
            try {
                await unlink(join(process.cwd(), "public/music", oldsong.filePath))
            } catch (error) {
                console.log(error);

            }

        }


        var c = await SongController.song.Update(song)
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
        var song = await SongController.song.Get(idSong)

        if (song == undefined || song.user_id != req.cookies.id) {
            res.json({
                err: true
            })
            return
        }
        song.status = status

        var check = await SongController.song.UpStatus(song)
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
    async GetValidateAll(req: Request, res: Response) {
        var ls = await SongController.song.GetValidateAll(req.params.idpage)
        res.json({
            err: true,
            songs: ls
        })
    }
    async GetSongByTabs(req: Request, res: Response) {
        var tabs = req.body.tabs
        let idPlaylist = req.body.idPlaylist || ""
        var start = req.body.start | 0

        var l: limit = {
            start: start,
            end: start + 100
        }

        var ls = await Promise.all([SongController.song.GetSongByTabs(tabs, idPlaylist, l),
        SongController.song.GetCountSongByTabs(tabs, idPlaylist)
        ])

        res.json({
            err: false,
            ls: ls[0],
            count: ls[1].count
        })
    }
    async GetSongByTabsAdmin(req: Request, res: Response) {
        var tabs = req.body.tabs + ""
        var nop = req.body.nop || 0
        let idPlaylist = req.body.idPlaylist || ""
        var start = req.body.start | 0

        var l: limit = {
            start: start,
            end: 10
        }
        var ls
        if (nop == 0) {
            ls = await Promise.all([SongController.song.GetSongByTabs(tabs, idPlaylist, l),
            SongController.song.GetCountSongByTabs(tabs, idPlaylist)])
        } else {
            ls = await Promise.all([SongController.song.GetSongWithoutAtPublicPlayList(tabs, l.start, l.end),
            SongController.song.GetCountSongWithoutAtPublicPlayList(tabs)])
        }

        res.json({
            err: false,
            ls: ls[0],
            count: ls[1].count
        })
    }
    async NextSong(req: Request, res: Response) {
        var idSong = req.body.idSong
        var ls = await SongController.song.NextSong(idSong)
        var index = 0
        if (ls.length != 0) {
            index = Math.floor(Math.random() * 1000 % ls.length)
        }
        res.json({
            err: ls.length == 0,
            song: ls[index]
        })
    }
}

var songController = new SongController()

export default songController