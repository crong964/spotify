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
class UserDatabase {
    constructor() {
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO user(id, Account, Name, Nationality) VALUES (?,?,?,?) ";
            var check;
            check = yield Config_1.default.query(sql, [d.id, d.Account, d.Name, d.Nationality]);
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM user WHERE id=?";
            var check;
            check = yield Config_1.default.query(sql, [id]);
            return check;
        });
    }
    VertifyAccount(user_id, Vertify) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE user SET Vertify= ? WHERE id = ?";
            var check;
            check = yield Config_1.default.query(sql, [Vertify, user_id]);
            return check;
        });
    }
    GetByAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM user WHERE Account =?";
            var check;
            check = yield Config_1.default.query(sql, [account]);
            return check;
        });
    }
    getAllArtist(Vertify) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM user WHERE Vertify = ?";
            var check;
            check = yield Config_1.default.query(sql, [Vertify]);
            return check;
        });
    }
    AddAccount(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "INSERT INTO user(id, Account, Name, Vertify, Nationality, ChanalName, pathImage, description, RefeshToken, Password, Banner) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            var check;
            check = yield Config_1.default.query(sql, [d.id, d.Account, d.Name, d.Vertify, d.Nationality, d.ChanalName, d.pathImage, d.description, d.RefeshToken, d.Password, d.Banner]);
            return check;
        });
    }
    UpdatePassword(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE user SET RefeshToken='',Password= ? WHERE Account=?";
            var check;
            check = yield Config_1.default.query(sql, [d.Password, d.Account]);
            return check;
        });
    }
    SearchName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM user WHERE Name like ? AND Vertify <> 0 ";
            var check;
            check = yield Config_1.default.query(sql, [`%${name}%`]);
            return check;
        });
    }
}
exports.default = UserDatabase;
