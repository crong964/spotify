import { Request, Response } from "express";
import firebase from "../config/Firebase";
import recentSongService from "../services/RecentSongService";
import path, { join } from "path";
import { unlink } from "fs/promises";
import "dotenv/config"
import { v4 as uuidv4 } from 'uuid';
import fs, { unlinkSync } from "fs"
import internal from "stream";

import jwt from "jsonwebtoken"
import songService from "../services/SongService"; import cryptojs from "crypto-js";
import googleDrive from "../config/GoogleDrive";

import { GaxiosPromise } from "googleapis-common";
import processvideo from "../config/ProcessVideo";
class StreamingController {
    static KEYTREAMING = uuidv4()
    static segment: any = { "6": true, "12": true, "20": true, "24": true }
    static song = songService
    static ggdrive = googleDrive
    constructor() {

    }
    async StreamingMusic(req: Request, res: Response) {
        res.setHeader("Cache-Control", "max-age=315360000, no-transform, must-revalidate")
        var start = parseInt(req.headers.range?.replace("bytes=", "").split("-")[0] || "0")
        var music = req.cookies.music
        var idSong = req.query.idSong as string
        var id = req.cookies.id
        if (idSong == undefined || idSong == "undefined") {
            res.end()
            return
        }


        var patsong = `song/${idSong}`
        try {
            var videoSize = parseInt(req.cookies.videoSize || "0")

            if (music != idSong && id != undefined) {
                recentSongService.Add(id, idSong)

                videoSize = parseInt(((await firebase.GetMeta(patsong))?.size + "") || "0")


                res.cookie("music", idSong, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 })
                res.cookie("videoSize", videoSize, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 })
            }
            var chuck = 100000

            var end = Math.min(start + chuck, videoSize - 1)
            var read = firebase.DownloadStreamFile(patsong, start, end)
                .on("error", (err) => {
                    console.log(err);
                })
            res.writeHead(206, {
                "accept-ranges": "bytes",
                "content-range": `bytes ${start}-${end}/${videoSize}`,
                "content-type": "audio/mp3",
                "content-length": end - start + 1

            })
            read.pipe(res)

        } catch (error) {
            console.log(error);

            res.json({
                err: true
            })
        }
    }
    async StreamingMusicUpload(req: Request, res: Response) {
        var namestrong = req.query.id as string
        if (namestrong.length <= 0) {
            res.json({ err: true })
            return
        }
        var pathg = path.join(process.cwd(), "public/music", namestrong)
        let patsong = `song/${namestrong}`
        if (fs.existsSync(pathg)) {
            try {
                namestrong = await firebase.UploadStream(pathg, patsong) as string
            } catch (error) {
                console.log(error);
                res.json({ err: true })
                return
            }
            try {
                unlink(pathg)
            } catch (error) {
                console.log(error);
            }
        }

        var videoSize = parseInt(((await firebase.GetMeta(patsong))?.size + "") || "0")
        var read = firebase.DownloadStreamFile(patsong, 0, videoSize)
            .on("error", (err) => {
                console.log(err);
            })
        read.pipe(res)
    }
    async StreamingMusicUpload2(req: Request, res: Response) {
        let { id } = req.query as any
        let filename = id
        let filepath = join(process.cwd(), "public/music", filename)
        let s = await processvideo.FileType(filepath)
        let f = false
        let input = join(process.cwd(), "public", "music", filename)

        if (s.data.indexOf("mp3") >= 0) {
            f = await processvideo.ConvertMp3ToMp4(input,
                join(process.cwd(), "public", "music", "mp4", filename))
            unlinkSync(input)

        }
        if (s.data.indexOf("mp4") >= 0) {
            fs.cpSync(input, join(process.cwd(), "public", "music", "mp4", filename))
            unlinkSync(input)
            f = true

        }

        let baseinput = join(process.cwd(), "public", "music", "mp4", filename)
        let fragmentoutput = join(process.cwd(), "public", "music", "Fragment", filename)
        let fram = await processvideo.Mp4Fragment(baseinput, fragmentoutput)

        if (!fram.err) {
            unlinkSync(baseinput)
        }
        let slipinput = join(process.cwd(), "public", "music", filename)
        fs.mkdirSync(slipinput)
        let slip = await processvideo.Mp4Split(fragmentoutput, join(slipinput, filename))

        if (!slip.err) {
            unlinkSync(fragmentoutput)
        }

        let d = await googleDrive.CreateFoder(filename)

        if (d.err || !d.id) {
            res.redirect("/teststreaming?err=lỗi")
            console.log(d.err);
            return
        }

        let idparent = d.id
        let ids: string[] = []
        let files = fs.readdirSync(slipinput)
        let pathslip = ""
        let j = 0
        let gap = 3
        do {
            j += gap
            let y = files.filter((v, i) => {
                return j > i && i >= j - 3
            }).map(async (v, i) => {
                i = j - gap + i
                if (i == 0) {
                    pathslip = join(slipinput, `${filename}.init`)
                } else {

                    if (s.data === "mp3") {
                        pathslip = join(slipinput, `${filename}-1.${i}.m4s`)
                    } else {
                        pathslip = join(slipinput, `${filename}-2.${i}.m4s`)
                    }
                }
                let id = await googleDrive.UploadStream(pathslip, `${filename}_${i}`, idparent)
                return id
            })

            let idtemp = await Promise.all(y) as string[]
            ids.push(...idtemp)
            console.log(`${j}/${files.length}`);

        } while (j < files.length);


        pathslip = `${filename}_init.txt`
        googleDrive.CreateTxt(pathslip, idparent, JSON.stringify(ids))


        res.redirect("/teststreaming")
        fs.rmSync(slipinput, { recursive: true, force: true });
    }
    async Streaming(req: Request, res: Response) {
        res.setHeader("Cache-Control", "max-age=315360000, no-transform, must-revalidate")
        const { segment, path, sign } = req.body
        let id = req.cookies.id
        let read: internal.Readable
        if (segment == "1") {
            let sign = jwt.sign({ path: path, time: 0, level: 0 }, StreamingController.KEYTREAMING, { expiresIn: 60 * 9 })
            res.cookie("sign", sign)
        }
        if (segment == "0") {
            read = firebase.DownloadFile(`streaming/${path}/${path}.init`)
            let lastSong = await recentSongService.GetLastRecentSong(id)

            if (req.cookies.id && (lastSong == undefined || lastSong.Id != path)) {
                recentSongService.Add(id, path)
            }
        } else {
            read = firebase.DownloadFile(`streaming/${path}/${path}-${segment}`)
            if (StreamingController.segment[segment + ""]) {
                try {
                    let sign = req.cookies.sign || ""
                    let oldign = jwt.verify(sign, StreamingController.KEYTREAMING) as jwt.JwtPayload
                    if (oldign.level < segment) {
                        let newtime = parseInt(oldign.time + "") + 1
                        if (newtime == 4) {
                            songService.IncreaseView(path)
                        } else {
                            let newsign = jwt.sign({ path: path, time: newtime, level: segment }, StreamingController.KEYTREAMING, { expiresIn: 60 * 9 })
                            res.cookie("sign", newsign)
                        }
                    }
                } catch (error) {

                }
            }
        }
        read.on("error", (err) => {
            console.log(err);
        })
        read.pipe(res)
    }
    async GetInitSong(req: Request, res: Response) {
        const { idsong } = req.body
        let ls = await StreamingController.ggdrive.SearchNameFile(`${idsong}_init.txt`)
        if (ls.length > 0) {
            StreamingController.ggdrive.DownloadFile(ls[0])
                .then((v) => {
                    res.json({
                        ls: v.data
                    })
                }).catch((v) => {
                    res.json({ ls: [] })
                    console.log("err GetInitSong " + __filename.replace("js", "ts"));
                })
            return
        }
        res.json({ ls: [] })
        return
    }
    async Streaming2(req: Request, res: Response) {
        res.setHeader("Cache-Control", "max-age=315360000, no-transform, must-revalidate")
        const { segment, path, sign, idSong } = req.body
        let id = req.cookies.id
        let read: GaxiosPromise<internal.Readable>
        if (segment == "1") {
            let sign = jwt.sign({ path: idSong, time: 0, level: 0 }, StreamingController.KEYTREAMING, { expiresIn: 60 * 9 })
            res.cookie("sign", sign)
        }
        read = StreamingController.ggdrive.DownloadStreamFile(path)
        if (segment == "0") {

            let lastSong = await recentSongService.GetLastRecentSong(id)

            if (req.cookies.id && (lastSong == undefined || lastSong.Id != idSong)) {
                recentSongService.Add(id, idSong)
            }
        } else {
            if (StreamingController.segment[segment + ""]) {
                try {
                    let sign = req.cookies.sign || ""
                    let oldign = jwt.verify(sign, StreamingController.KEYTREAMING) as jwt.JwtPayload
                    if (oldign.level < segment) {
                        let newtime = parseInt(oldign.time + "") + 1
                        if (newtime == 4) {
                            songService.IncreaseView(path)
                        } else {
                            let newsign = jwt.sign({ path: path, time: newtime, level: segment }, StreamingController.KEYTREAMING, { expiresIn: 60 * 9 })
                            res.cookie("sign", newsign)
                        }
                    }
                } catch (error) {
                }
            }
        }

        try {
            let r = await read
            r.data.pipe(res)
        } catch (error) {
            console.log(__filename);
            res.end()
        }
    }
}

const streamingController = new StreamingController()
export default streamingController