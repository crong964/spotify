import express from "express"
import path, { join } from "path"
import fs, { createWriteStream, writeFile } from "fs"
import bodyParser from "body-parser"
import { v4 as uuidv4 } from 'uuid';
import GenreRoute from "./route/GenreRoute";
import cookieParser from "cookie-parser";

import UserRoute from "./route/UserRoute";
import SongRoute from "./route/Song.Route";
import Account, { VerifyCookie } from "./route/Acount";
import LikedSongRoute from "./route/LikedSongRoute";
import recentSongService, { RecentSongService } from "./services/RecentSongService";
import RecentSongRoute from "./route/RecentSongRoute";
import SearchRoute from "./route/SearchRoute";
import PlayListRoute from "./route/PlayListRoute";
import GenreRouteAdmin from "./admin/GenreRouteAdmin";
import PlayListRouteAdmin from "./admin/PlayListRouteAdmin";
import ContainRouteAdmin from "./admin/ContainRouteAdmin";

const app = express()

app.use("/static", express.static(path.join(process.cwd(), "web")))
app.use("/public", express.static(path.join(process.cwd(), "public")))


app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    if (VerifyCookie(req)) {
        res.sendFile(path.join(process.cwd(), "web/home.html"))
        return
    }
    res.redirect("/auth")
})


app.use("/user", UserRoute)
app.use("/song", SongRoute)
app.use("/lsong", LikedSongRoute)
app.use("/rs", RecentSongRoute)
app.use("/search", SearchRoute)
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(process.cwd(), "web/dashboard.html"))
})

app.use("/auth", Account)

app.get("/idSong", (req, res) => {
    var start = req.headers.range?.replace("bytes=", "").split("-")
    var music = req.cookies.music
    var idSong = req.query.idSong as string

    var id = req.cookies.id
    if (idSong == undefined || id == undefined) {
        res.end()
        return
    }
    res.cookie("music", idSong, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 })

    if (!music || music != idSong) {
        recentSongService.Add(id, idSong)
    }
    try {
        var pathg = path.join(process.cwd(), "public/music", idSong)

        var s = fs.createReadStream(pathg)
        s.on("error", (err) => {
        })
        fs.stat(pathg, (err, stats) => {
            if (err) {
                console.log(err);
                res.end()
                return
            }
            res.setHeader("Content-Range", `bytes 0 -${stats.size}/${stats.size}`)
            res.setHeader("Content-Length", stats.size)
            res.setHeader("Content-Type", "audio/mp3")
            res.setHeader("Accept-Ranges", "bytes")
            s.pipe(res)

        })
    } catch (error) {
        console.log(error);

        res.json({
            err: true
        })
    }
})

app.get("/s", (req, res) => {
    var start = req.headers.range?.replace("bytes=", "").split("-")
    var namestrong = req.query.id as string



    try {
        var pathg = path.join(process.cwd(), "public/music", namestrong)

        var s = fs.createReadStream(pathg)
        s.on("error", (err) => {
        })
        fs.stat(pathg, (err, stats) => {
            if (err) {
                console.log(err);
                res.end()
                return
            }
            res.setHeader("Content-Range", `bytes 0 -${stats.size}/${stats.size}`)
            res.setHeader("Content-Length", stats.size)
            res.setHeader("Content-Type", "audio/mp3")
            res.setHeader("Accept-Ranges", "bytes")
            s.pipe(res)

        })
    } catch (error) {
        console.log(error);

        res.json({
            err: true
        })
    }


})
app.get("/gg", (req, res) => {
    res.sendFile(path.join(process.cwd(), "web/gg.html"))
})
app.use("/genre", GenreRoute)
app.use("/playlist", PlayListRoute)


//admin
app.use("/genre", GenreRouteAdmin)
app.use("/playlist", PlayListRouteAdmin)
app.use("/contain", ContainRouteAdmin)
app.get("/admin", (req, res) => {
    res.sendFile(join(process.cwd(), "web/admin.html"))
})
app.listen(8000, () => {
    console.log("http://localhost:8000/");
    console.log("http://localhost:8000/gg");
    console.log("http://localhost:8000/auth");
    console.log("http://localhost:8000/admin");
    console.log("http://localhost:8000/dashboard");
    console.log("http://localhost:8000/user/signin?account=sontungmtp@enter.com");
    console.log("http://localhost:8000/user/signin?account=PhanManhQuynh@pmq.com");
    console.log("http://localhost:8000/user/signin?account=DenVau@pmq.com");
    console.log("http://localhost:8000/auth/forgot");
})

