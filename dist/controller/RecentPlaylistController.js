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
const RecentPlaylistModel_1 = __importDefault(require("../model/RecentPlaylistModel"));
const LikedSongService_1 = __importDefault(require("../services/LikedSongService"));
const PlayListService_1 = __importDefault(require("../services/PlayListService"));
const RecentPlaylistService_1 = __importDefault(require("../services/RecentPlaylistService"));
const SongService_1 = __importDefault(require("../services/SongService"));
const UserService_1 = __importDefault(require("../services/UserService"));
class RecentPlaylistController {
    constructor() {
    }
    Play(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var User_ID = req.cookies.id;
            var d = new RecentPlaylistModel_1.default();
            d.User_ID = User_ID;
            d.ID = req.body.id;
            d.Type = req.body.type;
            var ls = [];
            let s = yield RecentPlaylistController.playlist.Get(d.ID);
            if (s != undefined) {
                ls = yield RecentPlaylistController.likesong.GetAllByIdPlayList(d.User_ID, s.id);
            }
            var check = yield RecentPlaylistService_1.default.Get(d.User_ID, d.ID);
            var check1 = undefined;
            if (check == undefined) {
                check1 = yield RecentPlaylistService_1.default.Add(d);
            }
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    GetAllByIdUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield RecentPlaylistController.r.GetByUser(req.cookies.id, 0, 6);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
}
RecentPlaylistController.user = UserService_1.default;
RecentPlaylistController.playlist = PlayListService_1.default;
RecentPlaylistController.song = SongService_1.default;
RecentPlaylistController.likesong = LikedSongService_1.default;
RecentPlaylistController.r = RecentPlaylistService_1.default;
const recentPlaylistController = new RecentPlaylistController();
exports.default = recentPlaylistController;
