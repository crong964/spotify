"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class UserModel extends BaseModel_1.default {
    constructor() {
        super();
        this.RefeshToken = "";
        this.Password = "";
        this.Name = "";
        this.id = "";
        this.Vertify = 0;
        this.Nationality = "";
        this.ChanalName = "";
        this.Account = "";
        this.description = "";
        this.pathImage = "";
        this.Banner = "";
    }
    setAll(d) {
        super.setAll(d);
        this.Password = "";
        this.Account = "";
    }
}
exports.default = UserModel;
