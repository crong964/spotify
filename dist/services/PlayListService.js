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
exports.PlayListService = void 0;
const Config_1 = __importDefault(require("../config/Config"));
const PlayListDatabase_1 = __importDefault(require("../database/PlayListDatabase"));
const PlayListModel_1 = require("../model/PlayListModel");
class PlayListService {
    constructor(playlist) {
        this.playlist = playlist;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO playlist(id, User_id, Genre_ID, Type, ImagePath, PlayListName, Likes, Songs, Duration, Status, Discripition) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            var check;
            check = yield Config_1.default.query(sql, [d.id, d.User_id, d.Genre_ID, d.Type, d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition]);
            return check;
        });
    }
    AddArtists(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO playlist(id, User_id, Genre_ID, Type, ImagePath, PlayListName, Likes, Songs, Duration, Status, Discripition) VALUES (?,?,?,'artist',?,?,?,?,?,?,?)";
            var check;
            check = yield Config_1.default.query(sql, [d.id, d.User_id, d.Genre_ID, d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition]);
            return check;
        });
    }
    GetArtistsByUserid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM playlist WHERE User_id = ? AND Type='artist'";
            var check;
            check = yield Config_1.default.query(sql, [id]);
            return this.SetLs(check)[0];
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM playlist WHERE id=?";
            var check;
            check = yield Config_1.default.query(sql, [id]);
            var ls = this.SetLs(check);
            return ls.length > 0 ? ls[0] : undefined;
        });
    }
    GetByGenre(Genre_ID, s, f) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM playlist WHERE Genre_ID in (SELECT g1.Id FROM genre g1, genre g2   WHERE g2.Id =? AND g1.LeftGenre >= g2.LeftGenre AND g1.RightGenre <= g2.RightGenre ) AND Type = 'playlist' LIMIT ?,? `;
            var check = yield Config_1.default.query(sql, [Genre_ID, s, f]);
            return this.SetLs(check);
        });
    }
    GetByUser_id(User_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM playlist WHERE User_id=?";
            var ls = yield Config_1.default.query(sql, [User_id]);
            return this.SetLs(ls);
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE playlist SET ImagePath=?,PlayListName=?,Likes=?,Songs=?,Duration=?,Status=?,Discripition=? WHERE id =?";
            var check;
            check = yield Config_1.default.query(sql, [d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition, d.id]);
            return check;
        });
    }
    VertifyPlaylist(idArtist, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE playlist SET Status=? WHERE User_id =? AND Type='artist'";
            var check;
            check = yield Config_1.default.query(sql, [status, idArtist]);
            return check;
        });
    }
    SetLs(ls) {
        if (ls == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new PlayListModel_1.PlayListModel();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
    SearchPlaylistName(playlistName) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM playlist WHERE Type=1 AND PlayListName LIKE ?`;
            var ls = yield Config_1.default.query(sql, [`%${playlistName}%`]);
            return this.SetLs(ls);
        });
    }
    GetPlayListLimit(start, count) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM playlist where Type='playlist' LIMIT ?,?";
            var ls = yield Config_1.default.query(sql, [start, count]);
            return this.SetLs(ls);
        });
    }
    GetPlayListArtistLimit(start, count) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM playlist where Type='artist' AND status=1 LIMIT ?,?`;
            var ls = yield Config_1.default.query(sql, [start, count]);
            return this.SetLs(ls);
        });
    }
    CountPlayListArtist() {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT count(*) as count FROM playlist where Type='artist' AND status=1 `;
            var ls = yield Config_1.default.query(sql, []);
            return ls[0];
        });
    }
    GetPlayListArtist(User_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM playlist where User_id=? AND Type='artist'`;
            var ls = yield Config_1.default.query(sql, [User_id]);
            return this.SetLs(ls)[0];
        });
    }
    DeletePlaylist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `Delete from playlist where id=?`;
            var ls = yield Config_1.default.query(sql, [id]);
            return ls;
        });
    }
    DeleteSongInPlayList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `Delete From contain where PlayList_id=?`;
            var check;
            check = yield Config_1.default.query(sql, [id]);
            return check;
        });
    }
    GetUserByArrayId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM playlist where ";
            for (let i = 0; i < id.length; i++) {
                if (i == id.length - 1) {
                    sql += ` User_id=?`;
                    continue;
                }
                sql += ` User_id=? or`;
            }
            let check = yield Config_1.default.query(sql, id);
            return this.SetLs(check);
        });
    }
}
exports.PlayListService = PlayListService;
var playListService = new PlayListService(new PlayListDatabase_1.default());
exports.default = playListService;
