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
const ArtistManagementModel_1 = __importDefault(require("../model/ArtistManagementModel"));
class ArtistManagementService {
    Add(idArtist) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `INSERT INTO artistmanagement(idArtist) VALUES (?)`;
            var check = yield Config_1.default.query(sql, [idArtist]);
            return check;
        });
    }
    Get(idArtist) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM artistmanagement WHERE idArtist=?`;
            var check = yield Config_1.default.query(sql, [idArtist]);
            return this.Setls(check)[0];
        });
    }
    GetCount() {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT count(*) as count FROM artistmanagement`;
            var check = yield Config_1.default.query(sql, []);
            return check[0];
        });
    }
    GetAll(start, count) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM artistmanagement a ,user u WHERE a.idArtist=u.id LIMIT ?,?`;
            var check = yield Config_1.default.query(sql, [start, count]);
            return this.Setls(check);
        });
    }
    GetWithout(start, count) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `SELECT * FROM user WHERE id NOT IN (SELECT idArtist FROM artistmanagement) AND Vertify = 1 LIMIT ?,?`;
            var check = yield Config_1.default.query(sql, [start, count]);
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
            var tem = new ArtistManagementModel_1.default();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
}
var artistManagementService = new ArtistManagementService();
exports.default = artistManagementService;
