import express from "express"
import path, { join } from "path"
import fs, { createWriteStream, writeFile } from "fs"
import bodyParser from "body-parser"
import { v4 as uuidv4 } from 'uuid';
import GenreRoute from "./route/GenreRoute";
import cookieParser from "cookie-parser";
import { Server } from "socket.io"
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
import DiscussRoute from "./route/DiscussRoute";
import NotificationRoute from "./route/NotificationRoute";
import BoxChatRoute from "./route/BoxChatRoute";
import MessRoute from "./route/MessRoute";
import { createServer } from "http";
import { parse } from "cookie";
import FriendRoute from "./route/FriendRoute";
import UserRouteAdmin from "./admin/UserRouteAdmin";
import ADMIN, { USER } from "./config/admin";
import "dotenv/config"
import { VertifyJWT } from "./config/Helper";
import jwt, { JwtPayload } from "jsonwebtoken"
import RecentPlaylistRoute from "./route/RecentPlaylistRoute";
import firebase from "./config/Firebase";
import ArtistManagementRoute from "./admin/ArtistManagementRoute";

import SongAdminRoute from "./admin/SongAdminRoute";

import CmdRoute from "./route/CmdRoute";
import StreamingRoute from "./route/StreamingRoute";
import PlayListLikeRoute from "./route/PlayListLikeRoute";
import { exec } from "child_process";
import TabRoute from "./admin/TabRoute";



const secret = process.env.SECRET || "1"
const production = process.env.MODE == "production"


const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cookie: false
})
app.use(cookieParser())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.setHeader('Access-Control-Allow-Methods', "*");
    var apikey = (req.headers.apikey as any) || req.cookies.apikey
    if (apikey) {
        var cookie = VertifyJWT(apikey)
        if (cookie != undefined) {
            req.cookies.id = cookie.id
        }

    }
    if (req.headers.iduser) {
        req.cookies.id = req.headers.iduser
    }
    setTimeout(() => {
        next();
    }, production ? 0 : 10);
});

app.use("/static", express.static(path.join(process.cwd(), "web", "static"), { maxAge: production ? 1000 * 60 * 60 * 24 * 3 : 0, cacheControl: true, immutable: true }))
app.use("/public", express.static(path.join(process.cwd(), "public"), { maxAge: 100000000000 }))
app.use("/i", express.static(path.join(process.cwd(), "public", "upload")))
app.get("/swagger", (req, res) => {
    res.sendFile(join(process.cwd(), "web/swagger.html"))
})
app.get("/ads.txt", (req, res) => {
    res.sendFile(join(process.cwd(), "web/ads.txt"))
})

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }))
app.use(bodyParser.json())


app.use("/mess", USER, MessRoute)
app.use("/box", USER, BoxChatRoute)
app.use("/likePlaylist", USER, PlayListLikeRoute)
app.use("/user", UserRoute)
app.use("/song", SongRoute)
app.use("/lsong", USER, LikedSongRoute)
app.use("/recentPlaylist", USER, RecentPlaylistRoute)
app.use("/rs", USER, RecentSongRoute)
app.use("/search", SearchRoute)
app.use("/discuss", USER, DiscussRoute)
app.use("/notification", USER, NotificationRoute)
app.use("/friend", USER, FriendRoute)
app.get("/dashboard", USER, (req, res) => {
    res.sendFile(path.join(process.cwd(), "web/dashboard.html"))
})

app.use("/auth", Account)



app.use("/genre", GenreRoute)
app.use("/playlist", PlayListRoute)
//admin
app.use("/admin/genre", ADMIN, GenreRouteAdmin)
app.use("/admin/playlist", ADMIN, PlayListRouteAdmin)
app.use("/admin/contain", ADMIN, ContainRouteAdmin)
app.use("/admin/UserRouteAdmin", ADMIN, UserRouteAdmin)
app.use("/admin/artist", ADMIN, ArtistManagementRoute)
app.use("/admin/song", ADMIN, SongAdminRoute)
app.use("/admin/cmd", ADMIN, CmdRoute)
app.use("/admin/tab", ADMIN, TabRoute)
app.use(StreamingRoute)


app.get(/admin/, ADMIN, (req, res) => {

    res.sendFile(join(process.cwd(), "web/admin.html"))
})
app.get(/\//, (req, res) => {
    res.sendFile(path.join(process.cwd(), "web/home.html"))
})
httpServer.listen(8000, () => {
    console.log("http://localhost:8000/teststreaming");
    console.log("http://localhost:8000/");
    console.log("http://localhost:8000/swagger");
    console.log("http://localhost:8000/gg");
    console.log("http://localhost:8000/auth");
    console.log("http://localhost:8000/admin");
    console.log("http://localhost:8000/dashboard");
    console.log("http://localhost:8000/auth/forgot");

    if (production) {
        let path = join(process.cwd(), "/dist/tool/mp4split")
        exec(`chmod u=rwx,g=r,o=r ${path}`, (errs, sout, sin) => {
            if (errs) {
                console.log(errs);
                return
            }
            console.log("mp4split ok");

        })
        path = join(process.cwd(), "/dist/tool/mp4fragment")
        exec(`chmod u=rwx,g=r,o=r ${path}`, (errs, sout, sin) => {
            if (errs) {
                console.log(errs);
                return
            }
            console.log("mp4fragment ok");

        })
    }
});

io.on("connection", (socket) => {
    var cookie = parse(socket.handshake.headers.cookie || "")
    var id = ""

    var decode = VertifyJWT(cookie.apikey)
    if (decode) {
        id = decode.id
    }

    socket.join(id)
    socket.on("disconnect", () => {
        io.socketsLeave(id)
    })

});
export default io

