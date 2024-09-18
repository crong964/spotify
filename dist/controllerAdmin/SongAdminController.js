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
const SongModel_1 = __importDefault(require("../model/SongModel"));
const SongService_1 = __importDefault(require("../services/SongService"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const UserService_1 = __importDefault(require("../services/UserService"));
const fs_1 = require("fs");
const PlayListService_1 = __importDefault(require("../services/PlayListService"));
const ContainService_1 = __importDefault(require("../services/ContainService"));
const ContainModel_1 = __importDefault(require("../model/ContainModel"));
const Firebase_1 = __importDefault(require("../config/Firebase"));
class SongAdminController {
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.body.id;
            let singer = JSON.parse(req.body.user_id);
            let check = yield Promise.all(singer.map((v) => __awaiter(this, void 0, void 0, function* () {
                return yield SongAdminController.user.Get(v.id);
            })));
            for (let i = 0; i < check.length; i++) {
                const element = check[i];
                if (element == undefined) {
                    res.json({
                        err: true,
                        mess: "ko có ca sĩ này"
                    });
                    return;
                }
            }
            var song = new SongModel_1.default();
            song.setAll(req.body);
            console.log(req.body);
            console.log(song);
            if (req.file != undefined) {
                try {
                    song.SongImage = (yield Firebase_1.default.UploadImageBuffer(`SongImage/${song.Id}`, req.file.buffer, 20000));
                }
                catch (error) {
                    console.log(error);
                }
            }
            let lsPlayListArtist = yield Promise.all(singer.map((v) => __awaiter(this, void 0, void 0, function* () {
                return yield SongAdminController.playlist.GetPlayListArtist(v.id);
            })));
            song.user_id = singer.reduce((s, f, i) => {
                if (i == singer.length - 1) {
                    return `${f.id}`;
                }
                return `${s}${f.id} `;
            }, "");
            song.Singer = singer.reduce((s, f, i) => {
                if (i == singer.length - 1) {
                    return `${s}${f.ChanalName}`;
                }
                return `${s}${f.ChanalName},`;
            }, "");
            var c = yield SongAdminController.song.Update(song);
            lsPlayListArtist.map((v) => __awaiter(this, void 0, void 0, function* () {
                let con = new ContainModel_1.default();
                con.PlayList_id = v.id;
                con.Song_id = song.Id;
                return yield SongAdminController.contain.Add(con);
            }));
            if (c) {
                res.json({
                    err: false
                });
                return;
            }
            res.json({
                err: true
            });
        });
    }
    Upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = req.body.d.trim().split(" ");
            var f = "";
            var idSong = "";
            if (req.body.name == undefined) {
                var id = req.body.idArtist;
                let check = yield SongAdminController.user.Get(id);
                let check1 = yield SongAdminController.playlist.GetPlayListArtist(id);
                if (check == undefined) {
                    res.json({
                        err: true,
                        name: f
                    });
                    return;
                }
                f = `song-${(0, uuid_1.v4)()}`;
                var song = new SongModel_1.default();
                var contain = new ContainModel_1.default();
                song.Genre_id = "";
                song.Id = f;
                song.Singer = check.ChanalName;
                song.user_id = check.id;
                song.filePath = f;
                contain.Song_id = f;
                contain.PlayList_id = check1.id;
                var fcheck = yield Promise.all([SongAdminController.song.Add(song),
                    SongAdminController.contain.Add(contain)]);
                if (fcheck[0] == undefined || fcheck[1] == undefined) {
                    res.json({
                        err: true,
                        name: f,
                    });
                    return;
                }
            }
            else {
                f = req.body.name;
            }
            var write = (0, fs_1.createWriteStream)(path_1.default.join(process.cwd(), "/public/music", `${f}`), {
                flags: "as+"
            });
            var s = d.map((v) => {
                return parseInt(v);
            });
            var s2 = Buffer.from(s);
            write.on("close", () => {
                res.json({
                    name: f,
                    err: false,
                    idSong: idSong
                });
            });
            write.write(s2);
            write.end(() => {
            });
        });
    }
    SongListAndInforArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.body.idArtist;
            var ls = yield SongAdminController.song.GetAll(id);
            var u = yield SongAdminController.user.Get(id);
            res.json({
                err: u == undefined,
                ls: ls,
                u: u
            });
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var song = new SongModel_1.default();
            song.setAll(req.body);
            // song.user_id == Đen Vâu@123@Min@123
            let singer = JSON.parse(req.body.user_id);
            let lsPlayListArtist = yield Promise.all(singer.map((v) => __awaiter(this, void 0, void 0, function* () {
                return yield SongAdminController.playlist.GetPlayListArtist(v.id);
            })));
            song.user_id = singer.reduce((s, f, i) => {
                if (i == singer.length - 1) {
                    return `${s}${f.id}`;
                }
                return `${s}${f.id} `;
            }, "");
            song.Singer = singer.reduce((s, f, i) => {
                if (i == singer.length - 1) {
                    return `${s}${f.ChanalName}`;
                }
                return `${s}${f.ChanalName},`;
            }, "");
            var oldsong = yield SongAdminController.song.Get(song.Id);
            if (oldsong == undefined) {
                res.json({
                    err: true
                });
                return;
            }
            let d = Date.now() + "";
            if (req.file != undefined) {
                try {
                    yield Firebase_1.default.MoveImage(`SongImage/${song.Id}`, `delete/SongImage/${song.Id}_${d}`);
                    song.SongImage = (yield Firebase_1.default.UploadImageBuffer(`SongImage/${song.Id}`, req.file.buffer, 20000));
                }
                catch (error) {
                    console.log(error);
                }
            }
            var c = yield SongAdminController.song.Update(song);
            lsPlayListArtist.map((v) => __awaiter(this, void 0, void 0, function* () {
                let con = new ContainModel_1.default();
                con.PlayList_id = v.id;
                con.Song_id = song.Id;
                let check = yield SongAdminController.contain.Get(con);
                if (check == undefined) {
                    return yield SongAdminController.contain.Add(con);
                }
                return true;
            }));
            if (c) {
                res.json({
                    err: false
                });
                return;
            }
            res.json({
                err: true
            });
        });
    }
    UpStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idSong = req.body.idSong;
            var status = req.body.status;
            var song = yield SongAdminController.song.Get(idSong);
            if (song == undefined) {
                res.json({
                    err: true
                });
                return;
            }
            song.status = status;
            var check = yield SongAdminController.song.UpStatus(song);
            if (check) {
                res.json({
                    err: false
                });
                return;
            }
            res.json({
                err: true
            });
            return;
        });
    }
    DeleteSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            let id = req.body.idArtist;
            let idsong = req.body.idsong;
            var data = yield Promise.all([
                SongAdminController.playlist.GetPlayListArtist(id),
                SongAdminController.song.Get(idsong)
            ]);
            var check = yield Promise.all([SongAdminController.song.Delete(idsong),
                SongAdminController.contain.Delete(idsong, data[0].id)]);
            if (((_a = data[1]) === null || _a === void 0 ? void 0 : _a.SongImage) && ((_b = data[1]) === null || _b === void 0 ? void 0 : _b.SongImage.length) > 0) {
                let d = Date.now() + "";
                yield Firebase_1.default.MoveImage(`SongImage/${data[1].Id}`, `delete/SongImage/${data[1].Id}_${d}`);
            }
            let d = Date.now() + "";
            if (check) {
                try {
                    yield Firebase_1.default.Move(`song/${(_c = data[1]) === null || _c === void 0 ? void 0 : _c.filePath}`, `delete/song/${(_d = data[1]) === null || _d === void 0 ? void 0 : _d.filePath}_${d}`);
                }
                catch (error) {
                    console.log(error);
                }
            }
            res.json({
                err: check[0] == undefined || check[1] == undefined
            });
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idsong = req.body.idsong;
            var song = yield SongAdminController.song.Get(idsong);
            if (song == undefined) {
                res.json({
                    err: true,
                });
                return;
            }
            res.json({
                err: false,
                song: song
            });
        });
    }
}
SongAdminController.song = SongService_1.default;
SongAdminController.user = UserService_1.default;
SongAdminController.playlist = PlayListService_1.default;
SongAdminController.contain = ContainService_1.default;
const songAdminController = new SongAdminController();
exports.default = songAdminController;
