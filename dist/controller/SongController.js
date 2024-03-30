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
const promises_1 = require("fs/promises");
const SongModel_1 = __importDefault(require("../model/SongModel"));
const SongService_1 = __importDefault(require("../services/SongService"));
const path_1 = __importStar(require("path"));
const uuid_1 = require("uuid");
const UserService_1 = __importDefault(require("../services/UserService"));
const fs_1 = require("fs");
class SongController {
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var u = yield SongController.user.Get(id);
            var song = new SongModel_1.default();
            if (u == undefined) {
                res.json({
                    err: true
                });
                return;
            }
            song.setAll(req.body);
            if (song.Singer.length == 0) {
                song.Singer = u.ChanalName;
            }
            if (req.file != undefined) {
                song.imagePath = "public/image/" + req.file.filename;
            }
            else {
                song.imagePath = u.pathImage;
            }
            var c = yield SongController.song.Update(song);
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
                var id = req.cookies.id;
                let check = yield SongController.user.Get(id);
                if (check == undefined) {
                    res.json({
                        err: true,
                        name: f
                    });
                    return;
                }
                f = (0, uuid_1.v4)();
                var song = new SongModel_1.default();
                song.Genre_id = "";
                song.Id = f;
                song.Singer = check.ChanalName;
                song.user_id = check.id;
                song.imagePath = check.pathImage;
                song.filePath = f;
                var fcheck = yield SongController.song.Add(song);
                if (fcheck == undefined) {
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
            var s = Buffer.from(d.map((v) => {
                return parseInt(v);
            }));
            write.write(s);
            write.end(() => {
            });
            res.json({
                name: f,
                err: false,
                idSong: idSong
            });
        });
    }
    SongList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var ls = yield SongController.song.GetAll(id);
            res.json({
                err: true,
                songs: ls
            });
        });
    }
    GetSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idsong = req.body.idsong;
            var song = yield SongController.song.Get(idsong);
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
    NewUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var song = new SongModel_1.default();
            song.setAll(req.body);
            var id = req.cookies.id;
            var u = yield SongController.user.Get(id);
            var oldsong = yield SongController.song.Get(song.Id);
            if (u == undefined || oldsong == undefined) {
                res.json({
                    err: true
                });
                return;
            }
            if (req.file != undefined) {
                song.imagePath = "public/image/" + req.file.filename;
                oldsong.imagePath.indexOf;
                if (oldsong.imagePath.indexOf("public/image/") > -1) {
                    try {
                        yield (0, promises_1.unlink)((0, path_1.join)(process.cwd(), oldsong.imagePath));
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            if (song.filePath != "" && song.filePath != oldsong.filePath) {
                try {
                    yield (0, promises_1.unlink)((0, path_1.join)(process.cwd(), "public/music", oldsong.filePath));
                }
                catch (error) {
                    console.log(error);
                }
            }
            var c = yield SongController.song.Update(song);
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
    NewUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = req.body.d.trim().split(" ");
            var f = "";
            var idSong = "";
            if (req.body.name == undefined) {
                var id = req.cookies.id;
                let check = yield SongController.user.Get(id);
                if (check == undefined) {
                    res.json({
                        err: true,
                        name: f
                    });
                    return;
                }
                f = (0, uuid_1.v4)();
            }
            else {
                f = req.body.name;
            }
            var write = (0, fs_1.createWriteStream)(path_1.default.join(process.cwd(), "/public/music", `${f}`), {
                flags: "as+"
            });
            var s = Buffer.from(d.map((v) => {
                return parseInt(v);
            }));
            write.write(s);
            write.end(() => {
            });
            res.json({
                name: f,
                err: false,
                idSong: idSong
            });
        });
    }
    UpStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idSong = req.body.idSong;
            var status = req.body.status;
            var song = yield SongController.song.Get(idSong);
            if (song == undefined || song.user_id != req.cookies.id) {
                res.json({
                    err: true
                });
                return;
            }
            song.status = status;
            var check = yield SongController.song.UpStatus(song);
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
    GetValidateAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield SongController.song.GetValidateAll(req.params.idpage);
            res.json({
                err: true,
                songs: ls
            });
        });
    }
    GetSongByGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idGenre = req.body.idGenre;
            var start = req.body.end | 0;
            var l = {
                start: start,
                end: start + 10
            };
            var ls = yield SongController.song.GetSongByGenre(idGenre, l);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
}
SongController.song = SongService_1.default;
SongController.user = UserService_1.default;
var songController = new SongController();
exports.default = songController;
