"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class AccountModel extends BaseModel_1.default {
    constructor() {
        super();
        this.Account = "";
        this.Password = "";
        this.id = "";
    }
}
exports.default = AccountModel;
