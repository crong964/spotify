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
exports.AccountService = void 0;
const Config_1 = __importDefault(require("../config/Config"));
const AccountModel_1 = __importDefault(require("../model/AccountModel"));
class AccountService {
    constructor() {
    }
    GetAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM account WHERE Account=?";
            var check = yield Config_1.default.query(sql, [account]);
            return this.SetLs(check)[0];
        });
    }
    Add(id, Account, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = 'INSERT INTO account(id, Account, Password) VALUES (?,?,?)';
            var check = yield Config_1.default.query(sql, [id, Account, Password]);
            return check;
        });
    }
    SetLs(any) {
        var list = [];
        if (any == undefined) {
            return [];
        }
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            var acc = new AccountModel_1.default();
            acc.setAll(element);
            list.push(acc);
        }
        return list;
    }
    UpdatePassword(Account, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE account SET Password= ? WHERE Account=?";
            var check;
            check = yield Config_1.default.query(sql, [Password, Account]);
            return check;
        });
    }
}
exports.AccountService = AccountService;
var accountService = new AccountService();
exports.default = accountService;
