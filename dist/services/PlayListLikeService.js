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
const Config_1 = __importDefault(require("../config/Config"));
const PlaylistLikeModel_1 = require("../model/PlaylistLikeModel");
class PlayListLikeService {
    Add(user_id, playlist_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO playlistlikes(User_ID, PlayList_id) VALUES (?,?)";
            let check = yield Config_1.default.query(sql, [user_id, playlist_id]);
            return check;
        });
    }
    Delete(user_id, playlist_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "DELETE FROM playlistlikes WHERE User_ID=? AND PlayList_id=?";
            let check = yield Config_1.default.query(sql, [user_id, playlist_id]);
            return check;
        });
    }
    Get(user_id, playlist_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT playlist.* FROM playlistlikes, playlist WHERE playlistlikes.User_ID =? AND playlistlikes.PlayList_id=? AND playlist.id = playlistlikes.PlayList_id";
            let check = yield Config_1.default.query(sql, [user_id, playlist_id]);
            return check.length > 0 ? this.Setls(check)[0] : undefined;
        });
    }
    GetAll(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT playlist.* FROM playlistlikes, playlist WHERE playlistlikes.User_ID =? AND playlist.id = playlistlikes.PlayList_id";
            let check = yield Config_1.default.query(sql, [user_id]);
            return this.Setls(check);
        });
    }
    Setls(ls) {
        if (ls == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new PlaylistLikeModel_1.PlayListLikeModel();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
}
const playListLikeService = new PlayListLikeService();
exports.default = playListLikeService;
