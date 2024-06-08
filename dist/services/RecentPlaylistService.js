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
exports.RecentPlaylistService = void 0;
const Config_1 = __importDefault(require("../config/Config"));
const RecentPlaylistModel_1 = __importDefault(require("../model/RecentPlaylistModel"));
class RecentPlaylistService {
    constructor() {
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `INSERT INTO recentplaylist(User_ID, ID) VALUES (?,?)`;
            var ls = yield Config_1.default.query(sql, [d.User_ID, d.ID]);
            return ls;
        });
    }
    Get(User_ID, ID) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM recentplaylist WHERE User_ID=? AND ID=?`;
            var ls = yield Config_1.default.query(sql, [User_ID, ID]);
            return this.SetLs(ls)[0];
        });
    }
    GetByUser(User_ID, s, count) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT playlist.*, recentplaylist.* 
        FROM recentplaylist, playlist 
        WHERE recentplaylist.ID=playlist.id AND recentplaylist.User_ID=? 
        ORDER BY CreateTime DESC LIMIT ?,?`;
            var ls = yield Config_1.default.query(sql, [User_ID, s, count]);
            return this.SetLs(ls);
        });
    }
    SetLs(ls) {
        if (ls == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new RecentPlaylistModel_1.default();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
}
exports.RecentPlaylistService = RecentPlaylistService;
const recentPlaylistService = new RecentPlaylistService();
exports.default = recentPlaylistService;
