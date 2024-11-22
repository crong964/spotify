"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importStar(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const GenreRoute_1 = __importDefault(require("./route/GenreRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const UserRoute_1 = __importDefault(require("./route/UserRoute"));
const Song_Route_1 = __importDefault(require("./route/Song.Route"));
const Acount_1 = __importDefault(require("./route/Acount"));
const LikedSongRoute_1 = __importDefault(require("./route/LikedSongRoute"));
const RecentSongRoute_1 = __importDefault(require("./route/RecentSongRoute"));
const SearchRoute_1 = __importDefault(require("./route/SearchRoute"));
const PlayListRoute_1 = __importDefault(require("./route/PlayListRoute"));
const GenreRouteAdmin_1 = __importDefault(require("./admin/GenreRouteAdmin"));
const PlayListRouteAdmin_1 = __importDefault(require("./admin/PlayListRouteAdmin"));
const ContainRouteAdmin_1 = __importDefault(require("./admin/ContainRouteAdmin"));
const DiscussRoute_1 = __importDefault(require("./route/DiscussRoute"));
const NotificationRoute_1 = __importDefault(require("./route/NotificationRoute"));
const BoxChatRoute_1 = __importDefault(require("./route/BoxChatRoute"));
const MessRoute_1 = __importDefault(require("./route/MessRoute"));
const http_1 = require("http");
const cookie_1 = require("cookie");
const FriendRoute_1 = __importDefault(require("./route/FriendRoute"));
const UserRouteAdmin_1 = __importDefault(require("./admin/UserRouteAdmin"));
const admin_1 = __importStar(require("./config/admin"));
require("dotenv/config");
const Helper_1 = require("./config/Helper");
const RecentPlaylistRoute_1 = __importDefault(require("./route/RecentPlaylistRoute"));
const ArtistManagementRoute_1 = __importDefault(require("./admin/ArtistManagementRoute"));
const SongAdminRoute_1 = __importDefault(require("./admin/SongAdminRoute"));
const CmdRoute_1 = __importDefault(require("./route/CmdRoute"));
const StreamingRoute_1 = __importDefault(require("./route/StreamingRoute"));
const PlayListLikeRoute_1 = __importDefault(require("./route/PlayListLikeRoute"));
const child_process_1 = require("child_process");
const secret = process.env.SECRET || "1";
const production = process.env.MODE == "production";
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cookie: false
});
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.setHeader('Access-Control-Allow-Methods', "*");
    var apikey = req.headers.apikey || req.cookies.apikey;
    if (apikey) {
        var cookie = (0, Helper_1.VertifyJWT)(apikey);
        if (cookie != undefined) {
            req.cookies.id = cookie.id;
        }
    }
    if (req.headers.iduser) {
        req.cookies.id = req.headers.iduser;
    }
    setTimeout(() => {
        next();
    }, production ? 0 : 10);
});
app.use("/static", express_1.default.static(path_1.default.join(process.cwd(), "web", "static"), { maxAge: production ? 1000 * 60 * 60 * 24 * 3 : 0, cacheControl: true, immutable: true }));
app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public"), { maxAge: 100000000000 }));
app.use("/i", express_1.default.static(path_1.default.join(process.cwd(), "public", "upload")));
app.get("/swagger", (req, res) => {
    res.sendFile((0, path_1.join)(process.cwd(), "web/swagger.html"));
});
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "50mb" }));
app.use(body_parser_1.default.json());
app.use("/mess", admin_1.USER, MessRoute_1.default);
app.use("/box", admin_1.USER, BoxChatRoute_1.default);
app.use("/likePlaylist", admin_1.USER, PlayListLikeRoute_1.default);
app.use("/user", UserRoute_1.default);
app.use("/song", Song_Route_1.default);
app.use("/lsong", LikedSongRoute_1.default);
app.use("/recentPlaylist", admin_1.USER, RecentPlaylistRoute_1.default);
app.use("/rs", admin_1.USER, RecentSongRoute_1.default);
app.use("/search", SearchRoute_1.default);
app.use("/discuss", admin_1.USER, DiscussRoute_1.default);
app.use("/notification", admin_1.USER, NotificationRoute_1.default);
app.use("/friend", admin_1.USER, FriendRoute_1.default);
app.get("/dashboard", admin_1.USER, (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "web/dashboard.html"));
});
app.use("/auth", Acount_1.default);
app.use("/genre", GenreRoute_1.default);
app.use("/playlist", PlayListRoute_1.default);
//admin
app.use("/admin/genre", admin_1.default, GenreRouteAdmin_1.default);
app.use("/admin/playlist", admin_1.default, PlayListRouteAdmin_1.default);
app.use("/admin/contain", admin_1.default, ContainRouteAdmin_1.default);
app.use("/admin/UserRouteAdmin", admin_1.default, UserRouteAdmin_1.default);
app.use("/admin/artist", admin_1.default, ArtistManagementRoute_1.default);
app.use("/admin/song", admin_1.default, SongAdminRoute_1.default);
app.use("/admin/cmd", admin_1.default, CmdRoute_1.default);
app.use(StreamingRoute_1.default);
app.get(/admin/, admin_1.default, (req, res) => {
    res.sendFile((0, path_1.join)(process.cwd(), "web/admin.html"));
});
app.get(/\//, (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "web/home.html"));
});
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
        let path = (0, path_1.join)(process.cwd(), "/dist/tool/mp4split");
        (0, child_process_1.exec)(`chmod u=rwx,g=r,o=r ${path}`, (errs, sout, sin) => {
            if (errs) {
                console.log(errs);
                return;
            }
            console.log("mp4split ok");
        });
        path = (0, path_1.join)(process.cwd(), "/dist/tool/mp4fragment");
        (0, child_process_1.exec)(`chmod u=rwx,g=r,o=r ${path}`, (errs, sout, sin) => {
            if (errs) {
                console.log(errs);
                return;
            }
            console.log("mp4fragment ok");
        });
    }
});
io.on("connection", (socket) => {
    var cookie = (0, cookie_1.parse)(socket.handshake.headers.cookie || "");
    var id = "";
    var decode = (0, Helper_1.VertifyJWT)(cookie.apikey);
    if (decode) {
        id = decode.id;
    }
    socket.join(id);
    socket.on("disconnect", () => {
        io.socketsLeave(id);
    });
});
exports.default = io;
