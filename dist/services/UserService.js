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
const UserDatabase_1 = __importDefault(require("../database/UserDatabase"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
class UserService {
    constructor(i) {
        this.userDatabae = i;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            yield this.userDatabae.Add(d);
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var user;
            var check = yield this.userDatabae.Get(id);
            if (check && check.length > 0) {
                user = new UserModel_1.default();
                user.setAll(check[0]);
            }
            return user;
        });
    }
    VertifyAccount(user_id, Vertify) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.userDatabae.VertifyAccount(user_id, "1");
            return check;
        });
    }
    GetByAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            var user;
            var check = yield this.userDatabae.GetByAccount(account);
            if (check && check.length > 0) {
                user = new UserModel_1.default();
                user.setAll(check[0]);
            }
            return user;
        });
    }
    getAllArtist(Vertify) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            check = yield this.userDatabae.getAllArtist(Vertify);
            var ls = this.SetList(check);
            return ls;
        });
    }
    GetAccountByAccAndPass(acc, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            var user;
            var check = yield this.userDatabae.GetAccountByAccAndPass(acc, pass);
            if (check && check.length > 0) {
                user = new UserModel_1.default();
                user.setAll(check[0]);
            }
            return user;
        });
    }
    SetList(ls) {
        if (ls == undefined) {
            return [];
        }
        var check = [];
        for (let id = 0; id < ls.length; id++) {
            const element = ls[id];
            var user = new UserModel_1.default();
            user.setAll(element);
            check.push(user);
        }
        return check;
    }
    AddAccount(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            check = yield this.userDatabae.AddAccount(d);
            return check;
        });
    }
    UpdatePassword(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            check = yield this.userDatabae.UpdatePassword(d);
            return check;
        });
    }
    SearchNameArtist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.userDatabae.SearchNameArtist(name);
            return this.SetList(ls);
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            check = yield this.userDatabae.Update(d);
            return check;
        });
    }
    GetAllUserByType(Vertify) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.userDatabae.GetAllUserByType(Vertify);
            return this.SetList(ls);
        });
    }
}
exports.UserService = UserService;
var userService = new UserService(new UserDatabase_1.default());
exports.default = userService;
