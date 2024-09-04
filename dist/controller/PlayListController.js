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
exports.PlayListController = void 0;
const ContainModel_1 = __importDefault(require("../model/ContainModel"));
const PlayListModel_1 = require("../model/PlayListModel");
const ContainService_1 = __importDefault(require("../services/ContainService"));
const PlayListService_1 = __importDefault(require("../services/PlayListService"));
const uuid_1 = require("uuid");
const GenreService_1 = __importDefault(require("../services/GenreService"));
const LikedSongService_1 = __importDefault(require("../services/LikedSongService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const HaveListFriendsService_1 = __importDefault(require("../services/HaveListFriendsService"));
const Firebase_1 = __importDefault(require("../config/Firebase"));
const PlayListLikeService_1 = __importDefault(require("../services/PlayListLikeService"));
class PlayListController {
    AddPlayListByAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            let playlistmodel = new PlayListModel_1.PlayListModel();
            playlistmodel.setAll(req.body);
            playlistmodel.id = `playlist-${(0, uuid_1.v4)()}`;
            playlistmodel.User_id = req.cookies.id;
            playlistmodel.Type = "playlist";
            playlistmodel.Songs = req.body.ls.length;
            if (req.file) {
                try {
                    playlistmodel.ImagePath = (yield Firebase_1.default.UploadImageBufferNoZip(`playlist/${playlistmodel.id}`, req.file.buffer));
                }
                catch (error) {
                    console.log(error);
                }
            }
            let check = yield PlayListService_1.default.Add(playlistmodel);
            let ls = req.body.ls;
            let list = ls.map((Song_id) => __awaiter(this, void 0, void 0, function* () {
                let temp = new ContainModel_1.default();
                temp.PlayList_id = playlistmodel.id;
                temp.Song_id = Song_id;
                return yield PlayListController.contain.Add(temp);
            }));
            let checkls = yield Promise.all(list);
            res.json({
                err: false
            });
        });
    }
    GetByGenreAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Genre_ID = req.body.Genre_ID;
            let ls = yield PlayListController.playlist.GetByGenre(Genre_ID, 0, 10);
            res.json({
                ls: ls, err: true
            });
        });
    }
    PlayListDetailAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idplaylist = req.params.idplaylist;
            let ls = yield Promise.all([PlayListController.playlist.Get(idplaylist),
                PlayListController.contain.GetAllByPlayList(idplaylist), PlayListController.
                    genre.GetIdParentByIdplaylist(idplaylist)]);
            res.json({
                err: ls[0] == undefined,
                playlist: ls[0],
                songs: ls[1],
                genre: ls[2]
            });
        });
    }
    UpdatePlayListDetailAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldplaylist = yield PlayListController.playlist.Get(req.body.id);
            if (!oldplaylist) {
                res.json({
                    err: true
                });
                return;
            }
            let playlistmodel = new PlayListModel_1.PlayListModel();
            playlistmodel.setAll(req.body);
            if (req.file) {
                try {
                    yield Firebase_1.default.MoveImage(`playlist/${playlistmodel.id}`, `deletePlaylist/playlist/${playlistmodel.id}`);
                    playlistmodel.ImagePath = (yield Firebase_1.default.UploadImageBufferNoZip(`playlist/${playlistmodel.id}`, req.file.buffer));
                }
                catch (error) {
                    console.log(error);
                }
            }
            playlistmodel.id = oldplaylist.id;
            playlistmodel.User_id = req.cookies.id;
            playlistmodel.Type = "playlist";
            if (req.body.ls) {
                playlistmodel.Songs = req.body.ls.length + oldplaylist.Songs;
                let ls = req.body.ls;
                let list = ls.map((Song_id) => __awaiter(this, void 0, void 0, function* () {
                    let temp = new ContainModel_1.default();
                    temp.PlayList_id = playlistmodel.id;
                    temp.Song_id = Song_id;
                    return yield PlayListController.contain.Add(temp);
                }));
                let checkls = yield Promise.all(list);
            }
            let check = yield PlayListService_1.default.Update(playlistmodel);
            res.json({
                err: check == undefined
            });
        });
    }
    GetPlayListById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_playlist = req.params.idplaylist;
            let id = req.cookies.id;
            let ls = yield Promise.all([PlayListController.playlist.Get(id_playlist),
                PlayListController.likedSong.GetAllByIdPlayList(id, id_playlist),
                PlayListController.Playlistlike.Get(id, id_playlist)]);
            res.json({
                playlist: ls[0],
                songs: ls[1],
                like: ls[2] != undefined,
                err: ls[0] == undefined
            });
        });
    }
    NextPlayListLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = req.body.start || 0;
            let count = req.body.count || 10;
            let ls = yield PlayListController.playlist.GetPlayListLimit(start, count);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    NextPlayArtistListLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = req.body.count || 10;
            let start = req.body.start * count || 0;
            let ls = yield Promise.all([PlayListController.playlist.GetPlayListArtistLimit(start, count),
                PlayListController.playlist.CountPlayListArtist()]);
            res.json({
                err: false,
                ls: ls[0],
                count: ls[1].count
            });
        });
    }
}
exports.PlayListController = PlayListController;
PlayListController.playlist = PlayListService_1.default;
PlayListController.contain = ContainService_1.default;
PlayListController.genre = GenreService_1.default;
PlayListController.likedSong = LikedSongService_1.default;
PlayListController.user = UserService_1.default;
PlayListController.HaveListFriends = HaveListFriendsService_1.default;
PlayListController.Playlistlike = PlayListLikeService_1.default;
let playListController = new PlayListController();
exports.default = playListController;
