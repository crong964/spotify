"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Firebase_1 = __importDefault(require("../config/Firebase"));
const RecentSongService_1 = __importDefault(require("../services/RecentSongService"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
require("dotenv/config");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SongService_1 = __importDefault(require("../services/SongService"));
class StreamingController {
    constructor() {
    }
    StreamingMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            res.setHeader("Cache-Control", "max-age=315360000, no-transform, must-revalidate");
            var start = parseInt(((_a = req.headers.range) === null || _a === void 0 ? void 0 : _a.replace("bytes=", "").split("-")[0]) || "0");
            var music = req.cookies.music;
            var idSong = req.query.idSong;
            var id = req.cookies.id;
            if (idSong == undefined || idSong == "undefined") {
                res.end();
                return;
            }
            var patsong = `song/${idSong}`;
            try {
                var videoSize = parseInt(req.cookies.videoSize || "0");
                if (music != idSong && id != undefined) {
                    RecentSongService_1.default.Add(id, idSong);
                    videoSize = parseInt((((_b = (yield Firebase_1.default.GetMeta(patsong))) === null || _b === void 0 ? void 0 : _b.size) + "") || "0");
                    res.cookie("music", idSong, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
                    res.cookie("videoSize", videoSize, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
                }
                var chuck = 100000;
                var end = Math.min(start + chuck, videoSize - 1);
                var read = Firebase_1.default.DownloadStreamFile(patsong, start, end)
                    .on("error", (err) => {
                    console.log(err);
                });
                res.writeHead(206, {
                    "accept-ranges": "bytes",
                    "content-range": `bytes ${start}-${end}/${videoSize}`,
                    "content-type": "audio/mp3",
                    "content-length": end - start + 1
                });
                read.pipe(res);
            }
            catch (error) {
                console.log(error);
                res.json({
                    err: true
                });
            }
        });
    }
    StreamingMusicUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            var namestrong = req.query.id;
            if (namestrong.length <= 0) {
                res.json({ err: true });
                return;
            }
            var pathg = path_1.default.join(process.cwd(), "public/music", namestrong);
            let patsong = `song/${namestrong}`;
            if (fs_1.default.existsSync(pathg)) {
                try {
                    namestrong = (yield Firebase_1.default.UploadStream(pathg, patsong));
                }
                catch (error) {
                    console.log(error);
                    res.json({ err: true });
                    return;
                }
                try {
                    (0, promises_1.unlink)(pathg);
                }
                catch (error) {
                    console.log(error);
                }
            }
            var videoSize = parseInt((((_a = (yield Firebase_1.default.GetMeta(patsong))) === null || _a === void 0 ? void 0 : _a.size) + "") || "0");
            var read = Firebase_1.default.DownloadStreamFile(patsong, 0, videoSize)
                .on("error", (err) => {
                console.log(err);
            });
            read.pipe(res);
        });
    }
    Streaming(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.setHeader("Cache-Control", "max-age=315360000, no-transform, must-revalidate");
            const { segment, path, sign } = req.body;
            let id = req.cookies.id;
            let read;
            if (segment == "1") {
                let sign = jsonwebtoken_1.default.sign({ path: path, time: 0, level: 0 }, StreamingController.KEYTREAMING, { expiresIn: 60 * 9 });
                res.cookie("sign", sign);
            }
            if (segment == "0") {
                read = Firebase_1.default.DownloadFile(`streaming/${path}/${path}.init`);
                let lastSong = yield RecentSongService_1.default.GetLastRecentSong(id);
                if (req.cookies.id && (lastSong == undefined || lastSong.Id != path)) {
                    RecentSongService_1.default.Add(id, path);
                }
            }
            else {
                read = Firebase_1.default.DownloadFile(`streaming/${path}/${path}-${segment}`);
                if (StreamingController.segment[segment + ""]) {
                    try {
                        let sign = req.cookies.sign || "";
                        let oldign = jsonwebtoken_1.default.verify(sign, StreamingController.KEYTREAMING);
                        if (oldign.level < segment) {
                            let newtime = parseInt(oldign.time + "") + 1;
                            if (newtime == 4) {
                                SongService_1.default.IncreaseView(path);
                            }
                            else {
                                let newsign = jsonwebtoken_1.default.sign({ path: path, time: newtime, level: segment }, StreamingController.KEYTREAMING, { expiresIn: 60 * 9 });
                                res.cookie("sign", newsign);
                            }
                        }
                    }
                    catch (error) {
                    }
                }
            }
            read.on("error", (err) => {
                console.log(err);
            });
            read.pipe(res);
        });
    }
}
StreamingController.KEYTREAMING = (0, uuid_1.v4)();
StreamingController.segment = { "6": true, "12": true, "20": true, "24": true };
StreamingController.song = SongService_1.default;
const streamingController = new StreamingController();
exports.default = streamingController;
