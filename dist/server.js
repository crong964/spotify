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
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const GenreRoute_1 = __importDefault(require("./route/GenreRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const UserRoute_1 = __importDefault(require("./route/UserRoute"));
const Song_Route_1 = __importDefault(require("./route/Song.Route"));
const Acount_1 = __importStar(require("./route/Acount"));
const LikedSongRoute_1 = __importDefault(require("./route/LikedSongRoute"));
const RecentSongService_1 = __importDefault(require("./services/RecentSongService"));
const RecentSongRoute_1 = __importDefault(require("./route/RecentSongRoute"));
const SearchRoute_1 = __importDefault(require("./route/SearchRoute"));
const PlayListRoute_1 = __importDefault(require("./route/PlayListRoute"));
const GenreRouteAdmin_1 = __importDefault(require("./admin/GenreRouteAdmin"));
const PlayListRouteAdmin_1 = __importDefault(require("./admin/PlayListRouteAdmin"));
const ContainRouteAdmin_1 = __importDefault(require("./admin/ContainRouteAdmin"));
const DiscussRoute_1 = __importDefault(require("./route/DiscussRoute"));
const app = (0, express_1.default)();
app.use("/static", express_1.default.static(path_1.default.join(process.cwd(), "web")));
app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "500mb" }));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    if ((0, Acount_1.VerifyCookie)(req)) {
        res.sendFile(path_1.default.join(process.cwd(), "web/home.html"));
        return;
    }
    res.redirect("/auth");
});
app.use("/user", UserRoute_1.default);
app.use("/song", Song_Route_1.default);
app.use("/lsong", LikedSongRoute_1.default);
app.use("/rs", RecentSongRoute_1.default);
app.use("/search", SearchRoute_1.default);
app.use("/discuss", DiscussRoute_1.default);
app.get("/dashboard", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "web/dashboard.html"));
});
app.use("/auth", Acount_1.default);
app.get("/idSong", (req, res) => {
    var _a;
    var start = (_a = req.headers.range) === null || _a === void 0 ? void 0 : _a.replace("bytes=", "").split("-");
    var music = req.cookies.music;
    var idSong = req.query.idSong;
    var id = req.cookies.id;
    if (idSong == undefined || id == undefined) {
        res.end();
        return;
    }
    res.cookie("music", idSong, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
    if (!music || music != idSong) {
        RecentSongService_1.default.Add(id, idSong);
    }
    try {
        var pathg = path_1.default.join(process.cwd(), "public/music", idSong);
        var s = fs_1.default.createReadStream(pathg);
        s.on("error", (err) => {
        });
        fs_1.default.stat(pathg, (err, stats) => {
            if (err) {
                console.log(err);
                res.end();
                return;
            }
            res.setHeader("Content-Range", `bytes 0 -${stats.size}/${stats.size}`);
            res.setHeader("Content-Length", stats.size);
            res.setHeader("Content-Type", "audio/mp3");
            res.setHeader("Accept-Ranges", "bytes");
            s.pipe(res);
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            err: true
        });
    }
});
app.get("/s", (req, res) => {
    var _a;
    var start = (_a = req.headers.range) === null || _a === void 0 ? void 0 : _a.replace("bytes=", "").split("-");
    var namestrong = req.query.id;
    try {
        var pathg = path_1.default.join(process.cwd(), "public/music", namestrong);
        var s = fs_1.default.createReadStream(pathg);
        s.on("error", (err) => {
        });
        fs_1.default.stat(pathg, (err, stats) => {
            if (err) {
                console.log(err);
                res.end();
                return;
            }
            res.setHeader("Content-Range", `bytes 0 -${stats.size}/${stats.size}`);
            res.setHeader("Content-Length", stats.size);
            res.setHeader("Content-Type", "audio/mp3");
            res.setHeader("Accept-Ranges", "bytes");
            s.pipe(res);
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            err: true
        });
    }
});
app.get("/gg", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "web/gg.html"));
});
app.use("/genre", GenreRoute_1.default);
app.use("/playlist", PlayListRoute_1.default);
//admin
app.use("/genre", GenreRouteAdmin_1.default);
app.use("/playlist", PlayListRouteAdmin_1.default);
app.use("/contain", ContainRouteAdmin_1.default);
app.get("/admin", (req, res) => {
    res.sendFile((0, path_1.join)(process.cwd(), "web/admin.html"));
});
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
});
