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
exports.ContainService = void 0;
const ContainModel_1 = __importDefault(require("../model/ContainModel"));
const Config_1 = __importDefault(require("../config/Config"));
class ContainService {
    constructor() {
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = " INSERT INTO contain(Song_id, PlayList_id) VALUES (?,?) ";
            var check;
            check = (yield Config_1.default.query(sql, [d.Song_id, d.PlayList_id]));
            return check;
        });
    }
    Get(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = ` SELECT * FROM contain WHERE Song_id=? AND PlayList_id=? `;
            var check;
            check = yield Config_1.default.query(sql, [d.Song_id, d.PlayList_id]);
            var ls = this.Setls(check);
            return ls.length > 0 ? ls[0] : undefined;
        });
    }
    Delete(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `DELETE FROM contain WHERE Song_id=? AND PlayList_id=? `;
            var check;
            check = yield Config_1.default.query(sql, [d.Song_id, d.PlayList_id]);
            return check;
        });
    }
    GetAllByPlayList(PlayList_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT song.Id,song.SongName,song.Viewer,song.Singer,song.Duration,song.filePath,song.SongImage, contain.TimeCreate FROM contain,song WHERE contain.Song_ID=song.Id AND contain.PlayList_id=?";
            var check;
            check = yield Config_1.default.query(sql, [PlayList_id]);
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
            var tem = new ContainModel_1.default();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
}
exports.ContainService = ContainService;
var containService = new ContainService();
exports.default = containService;
