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
class HaveListFriendsDatabase {
    constructor() {
    }
    InsertListFriends(idUser, idFriend, IsFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `INSERT INTO havelistfriends(idUser, idFriends,IsFriend) VALUES (?,?,?)`;
            var check = yield Config_1.default.query(sql, [idUser, idFriend, IsFriend]);
            return check;
        });
    }
    Get(idUser, idAddFriends) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM havelistfriends WHERE idUser=? AND idFriends=? ";
            var check = yield Config_1.default.query(sql, [idUser, idAddFriends]);
            return check;
        });
    }
    CancelFriends(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `DELETE FROM havelistfriends WHERE idUser = ? AND idFriends = ?`;
            var check = yield Config_1.default.query(sql, [idUser, idFriend]);
            return check;
        });
    }
    GetAllTypeFriend(idUser, IsFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT u.id,u.Name,u.pathImage FROM havelistfriends h,user u WHERE u.id=h.idFriends AND h.idUser =?  AND h.IsFriend= ?`;
            var check = yield Config_1.default.query(sql, [idUser, IsFriend]);
            return check;
        });
    }
    UpDateType(idUser, idFriend, IsFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `UPDATE havelistfriends SET IsFriend=? WHERE idUser=? AND idFriends=?`;
            var check = yield Config_1.default.query(sql, [IsFriend, idUser, idFriend]);
            return check;
        });
    }
}
exports.default = HaveListFriendsDatabase;
