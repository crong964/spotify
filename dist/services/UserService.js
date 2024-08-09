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
exports.UserService = void 0;
const Config_1 = __importDefault(require("../config/Config"));
const UserDatabase_1 = __importDefault(require("../database/UserDatabase"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
class UserService {
    constructor(i) {
        this.userDatabae = i;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(d);
            let check;
            try {
                check = yield this.userDatabae.AddAccount(d);
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            let check = yield this.userDatabae.Get(id);
            if (check && check.length > 0) {
                user = new UserModel_1.default();
                user.setAll(check[0]);
            }
            return user;
        });
    }
    VertifyAccount(user_id, Vertify) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = yield this.userDatabae.VertifyAccount(user_id, Vertify);
            return check;
        });
    }
    getAllArtist(Vertify) {
        return __awaiter(this, void 0, void 0, function* () {
            let check;
            check = yield this.userDatabae.getAllArtist(Vertify);
            let ls = this.SetList(check);
            return ls;
        });
    }
    SetList(ls) {
        if (ls == undefined) {
            return [];
        }
        let check = [];
        for (let id = 0; id < ls.length; id++) {
            const element = ls[id];
            let user = new UserModel_1.default();
            user.setAll(element);
            check.push(user);
        }
        return check;
    }
    AddAccount(d) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO user(id, Name, Vertify, Nationality, ChanalName, pathImage, description, RefeshToken, Banner,role) VALUES (?,?,?,?,?,?,?,?,?,?)";
            let check;
            check = yield Config_1.default.query(sql, [d.id, d.Name, d.Vertify, d.Nationality, d.ChanalName, d.pathImage, d.description, d.RefeshToken, d.Banner, d.role]);
            return check;
        });
    }
    SearchNameArtist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM user WHERE user.role ='user' AND Name like ? AND Vertify = 1 ";
            let check;
            check = yield Config_1.default.query(sql, [`%${name}%`]);
            return this.SetList(check);
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE user SET Name=?,Nationality=?,ChanalName=?,pathImage=? ,Banner=? WHERE id=? ";
            let check;
            check = yield Config_1.default.query(sql, [d.Name, d.Nationality, d.ChanalName, d.pathImage, d.Banner, d.id]);
            return check;
        });
    }
    GetAllUserByType(Vertify) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM `user` WHERE Vertify LIKE ? AND role = 'user' ";
            let ls;
            ls = (yield Config_1.default.query(sql, [`%${Vertify}%`]));
            return this.SetList(ls);
        });
    }
    GetAllEAdmin(role) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM user WHERE role LIKE ? AND role <> 'master' ";
            let ls;
            ls = (yield Config_1.default.query(sql, [`%${role}%`]));
            return this.SetList(ls);
        });
    }
    DeleteEAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "Delete FROM user WHERE id = ? AND role = 'employee' ";
            let ls;
            ls = (yield Config_1.default.query(sql, [id]));
            return this.SetList(ls);
        });
    }
    UpdateE(d) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE user SET Name=?, Password=? , role=? WHERE id= ?";
            let check = yield Config_1.default.query(sql, [d.Name, d.pathImage, d.role, d.id]);
            return check;
        });
    }
}
exports.UserService = UserService;
let userService = new UserService(new UserDatabase_1.default());
exports.default = userService;
