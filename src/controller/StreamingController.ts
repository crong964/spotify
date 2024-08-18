import { Request, Response } from "express";
import firebase from "../config/Firebase";
import recentSongService from "../services/RecentSongService";
import path from "path";
import { unlink } from "fs/promises";
import "dotenv/config"
import { v4 as uuidv4 } from 'uuid';
import fs, { createWriteStream, writeFile } from "fs"
import internal from "stream";
import { SignJWT } from "../config/Helper";
import jwt from "jsonwebtoken"
import songService from "../services/SongService";
class StreamingController {
    static KEYTREAMING = uuidv4()
    static segment = { "6": true, "12": true, "20": true, "24": true }
    static song = songService
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
    async Streaming(req: Request, res: Response) {
        res.setHeader("Cache-Control", "max-age=315360000, no-transform, must-revalidate")
        const { segment, path } = req.body
        if (req.cookies.id) {
            recentSongService.Add(req.cookies.id, path)
        }

        let read: internal.Readable
        if (segment == "1") {
            let sign = jwt.sign({ path: path, time: 0, level: 0 }, StreamingController.KEYTREAMING, { expiresIn: 60 * 9 })
            res.cookie("sign", sign)
        }
        if (segment == "0") {
            read = firebase.DownloadFile(`streaming/${path}/${path}.init`)
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
}

const streamingController = new StreamingController()
export default streamingController