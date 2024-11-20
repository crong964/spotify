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
const ArtistManagementService_1 = __importDefault(require("../services/ArtistManagementService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const Firebase_1 = __importDefault(require("../config/Firebase"));
const crypto_1 = require("crypto");
const UserModel_1 = __importDefault(require("../model/UserModel"));
const PlayListService_1 = __importDefault(require("../services/PlayListService"));
const PlayListModel_1 = require("../model/PlayListModel");
class ArtistManagementController {
    constructor() {
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = req.files;
            if (!files || !files["Banner"] || !files["pathImage"]) {
                res.json({
                    err: true
                });
                return;
            }
            let id = `artist-${(0, crypto_1.randomUUID)()}-${Date.now()}`;
            let BannerFile = files["Banner"][0];
            let pathImageFile = files["pathImage"][0];
            let name = [];
            try {
                name = yield Promise.all([
                    Firebase_1.default.UploadImageBuffer(`Banner/${id}`, BannerFile.buffer),
                    Firebase_1.default.UploadImageBuffer(`PathImageFile/${id}`, pathImageFile.buffer)
                ]);
            }
            catch (error) {
                console.log(error);
            }
            if (name.length < 2) {
                res.json({
                    err: true
                });
                return;
            }
            let user = new UserModel_1.default();
            let d = new PlayListModel_1.PlayListModel();
            user.setAll(req.body);
            user.id = id;
            user.Banner = name[0];
            user.pathImage = name[1];
            d.User_id = user.id;
            d.ImagePath = user.pathImage;
            d.id = user.id;
            d.Status = "0";
            d.PlayListName = user.ChanalName;
            let check = yield Promise.all([
                ArtistManagementController.user.Add(user),
                ArtistManagementController.artistManagement.Add(id),
                ArtistManagementController.playlist.AddArtists(d)
            ]);
            res.json({
                err: false,
                mess: ""
            });
        });
    }
    AddQickly(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = `artist-${(0, crypto_1.randomUUID)()}-${Date.now()}`;
            let user = new UserModel_1.default();
            let d = new PlayListModel_1.PlayListModel();
            user.setAll(req.body);
            user.id = id;
            d.User_id = user.id;
            d.ImagePath = user.pathImage;
            d.id = id;
            user.Vertify = "1";
            d.Status = "0";
            d.PlayListName = user.ChanalName;
            try {
                yield Promise.all([
                    ArtistManagementController.user.Add(user),
                    ArtistManagementController.artistManagement.Add(id),
                    ArtistManagementController.playlist.AddArtists(d)
                ]);
            }
            catch (error) {
                console.log(error);
            }
            res.json({
                err: false,
                data: {
                    id: user.id,
                    ChanalName: user.ChanalName
                }
            });
        });
    }
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = req.body.start || 0;
            let count = (req.body.page || 1) * 10;
            let ls = yield Promise.all([ArtistManagementController.artistManagement.GetAll(start, count), ArtistManagementController.artistManagement.GetCount()]);
            res.json({
                ls: ls[0],
                count: ls[1].count,
                err: false
            });
        });
    }
    GetWithout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = req.body.start || 0;
            let count = (req.body.page || 1) * 10;
            let ls = yield ArtistManagementController.artistManagement.GetWithout(start, count);
            res.json({
                ls: ls,
                err: false
            });
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idArtist = req.body.idArtist;
            let user = yield ArtistManagementController.user.Get(idArtist);
            res.json({
                err: user == undefined,
                ls: user
            });
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = req.files;
            let old = yield ArtistManagementController.user.Get(req.body.id);
            let user = new UserModel_1.default();
            if (!old) {
                res.json({
                    err: true
                });
                return;
            }
            user.setAll(req.body);
            user.Banner = old.Banner;
            user.pathImage = old.pathImage;
            let id = user.id;
            if (files) {
                let date = Date.now() + "";
                try {
                    if (files["Banner"]) {
                        let BannerFile = files["Banner"][0];
                        if (old.Banner.length > 0) {
                            yield Firebase_1.default.MoveImage(`Banner/${id}`, `delete/Banner/${id}_${date}`);
                        }
                        user.Banner = (yield Firebase_1.default.UploadImageBuffer(`Banner/${id}`, BannerFile.buffer));
                    }
                    if (files["pathImage"]) {
                        let pathImageFile = files["pathImage"][0];
                        if (old.pathImage.length > 0) {
                            yield Firebase_1.default.MoveImage(`PathImageFile/${id}`, `delete/PathImageFile/${id}_${date}`);
                        }
                        user.pathImage = (yield Firebase_1.default.UploadImageBuffer(`PathImageFile/${id}`, pathImageFile.buffer));
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            let d = yield ArtistManagementController.playlist.GetArtistsByUserid(user.id);
            d.PlayListName = user.ChanalName;
            d.ImagePath = user.pathImage;
            let check = yield Promise.all([
                ArtistManagementController.user.Update(user),
                ArtistManagementController.playlist.Update(d)
            ]);
            res.json({
                err: false,
                mess: ""
            });
        });
    }
    VertifyArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idArtist = req.body.idArtist;
            var status = req.body.status || "1";
            var check = yield ArtistManagementController.user.VertifyAccount(idArtist, status);
            let check1 = yield ArtistManagementController.playlist.VertifyPlaylist(idArtist, status);
            res.json({
                err: check == undefined
            });
        });
    }
}
ArtistManagementController.user = UserService_1.default;
ArtistManagementController.artistManagement = ArtistManagementService_1.default;
ArtistManagementController.playlist = PlayListService_1.default;
const artistManagementController = new ArtistManagementController();
exports.default = artistManagementController;
