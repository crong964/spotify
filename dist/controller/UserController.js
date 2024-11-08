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
const path_1 = require("path");
const UserModel_1 = __importDefault(require("../model/UserModel"));
const UserService_1 = __importDefault(require("../services/UserService"));
const promises_1 = require("fs/promises");
const uuid_1 = require("uuid");
const HaveListFriendsService_1 = __importDefault(require("../services/HaveListFriendsService"));
const PlayListService_1 = __importDefault(require("../services/PlayListService"));
const LikedSongService_1 = __importDefault(require("../services/LikedSongService"));
const LikedSongModel_1 = __importDefault(require("../model/LikedSongModel"));
const AccountService_1 = __importDefault(require("../services/AccountService"));
const AccountModel_1 = __importDefault(require("../model/AccountModel"));
const PlayListLikeService_1 = __importDefault(require("../services/PlayListLikeService"));
class UserController {
    constructor() {
    }
    SignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var account = req.query.account;
            if (!account) {
            }
            var check = yield UserController.account.GetAccount(account);
            res.cookie("id", check === null || check === void 0 ? void 0 : check.id, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true });
            res.redirect("http://localhost:8000/dashboard");
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var use = yield UserController.user.Get(id);
            if (use) {
                res.json({
                    err: false,
                    u: use
                });
                return;
            }
            res.json({
                err: true,
                u: use
            });
        });
    }
    getAllArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield UserController.user.getAllArtist("1");
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    getArtisePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idArtist = req.params.artistpage;
            var id = req.cookies.id;
            var playlist = yield UserController.playlist.Get(idArtist);
            if (playlist == undefined) {
                res.json({
                    err: true,
                    mess: "ko có danh sách phát này"
                });
                return;
            }
            let temp = new LikedSongModel_1.default();
            temp.user_id = playlist.User_id;
            temp.id_user_liked = id;
            let l = yield Promise.all([UserController.user.Get(playlist.User_id),
                UserController.HaveListFriends.Get(id, playlist.User_id),
                UserController.likedSong.GetAllByIduserAndIdArtise(temp),
                UserController.playlistlike.Get(id, idArtist)]);
            let idOtherArtist = {};
            let arrayId = [];
            let lsong = l[2];
            lsong.map((value) => {
                let lsvalue = value.user_id.split(" ");
                lsvalue.map((vds) => {
                    if (!idOtherArtist[vds] && vds != idArtist && vds != "") {
                        idOtherArtist[vds] = true;
                        arrayId.push(vds);
                    }
                });
            });
            let lsuer = [];
            if (arrayId.length > 0) {
                lsuer = yield UserController.playlist.GetUserByArrayId(arrayId);
            }
            res.json({
                err: false,
                atist: l[0],
                isfriend: l[1] ? l[1].IsFriend : "-1",
                lsong: l[2],
                like: l[3] != undefined,
                lsplaylistartist: lsuer
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = new UserModel_1.default();
            var olduer = yield UserController.user.Get(req.cookies.id);
            if (!olduer) {
                res.json({
                    err: true
                });
                return;
            }
            d.setAll(olduer);
            d.setAll(req.body);
            if (req.file) {
                d.pathImage = (0, path_1.join)("/public/avatar", req.file.filename);
                try {
                    yield (0, promises_1.unlink)((0, path_1.join)(process.cwd(), olduer.pathImage));
                }
                catch (error) {
                    console.log(error);
                }
            }
            var check = yield UserController.user.Update(d);
            res.json({
                err: check == undefined
            });
        });
    }
    GetAllUserAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var Vertify = req.body.Vertify || "";
            var ls = yield UserController.user.GetAllUserByType(Vertify);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    GetAllEAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var role = req.body.role || "employee";
            var ls = yield UserController.user.GetAllEAdmin(role);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    AddEAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = new UserModel_1.default();
            var account = new AccountModel_1.default();
            account.setAll(req.body);
            user.setAll(req.body);
            var check = yield UserController.account.GetAccount(account.Account);
            if (check) {
                res.json({
                    err: true,
                    mess: "đã tồn tại"
                });
                return;
            }
            user.id = `user-${(0, uuid_1.v4)()}`;
            var add = yield UserController.user.AddAccount(user);
            if (!add) {
                res.json({
                    err: true,
                    mess: "không thêm dc user"
                });
                return;
            }
            add = yield UserController.account.Add(user.id, account.Account, account.Password);
            res.json({
                err: add == undefined,
            });
        });
    }
    DeleteEAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.body.id;
            var de = yield UserController.user.DeleteEAdmin(id);
            res.json({
                err: de == undefined
            });
        });
    }
    GetEditUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.params.id;
            var de = yield UserController.user.Get(id);
            res.json({
                err: de == undefined,
                data: de
            });
        });
    }
    PostEditUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = new UserModel_1.default();
            user.setAll(req.body);
            var de = yield UserController.user.UpdateE(user);
            res.json({
                err: de == undefined,
            });
        });
    }
}
UserController.user = UserService_1.default;
UserController.account = AccountService_1.default;
UserController.HaveListFriends = HaveListFriendsService_1.default;
UserController.likedSong = LikedSongService_1.default;
UserController.playlist = PlayListService_1.default;
UserController.playlistlike = PlayListLikeService_1.default;
var userController = new UserController();
exports.default = userController;
