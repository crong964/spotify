"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class UserModel extends BaseModel_1.default {
    constructor() {
        super();
        this.role = "user";
        this.RefeshToken = "";
        this.Name = "";
        this.id = "";
        this.Vertify = "0";
        this.Nationality = "";
        this.ChanalName = "";
        this.description = "";
        this.pathImage = "";
        this.Banner = "";
    }
    setAll(d) {
        super.setAll(d);
    }
}
exports.default = UserModel;
