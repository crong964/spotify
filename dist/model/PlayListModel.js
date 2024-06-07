"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayListModel = void 0;
const BaseModel_1 = __importDefault(require("./BaseModel"));
class PlayListModel extends BaseModel_1.default {
    constructor() {
        super();
        this.id = "";
        this.User_id = "";
        this.Genre_ID = "";
        this.Type = "nono";
        this.ImagePath = "";
        this.PlayListName = "";
        this.Likes = 0;
        this.Songs = 0;
        this.Duration = "";
        this.Status = "";
        this.Discripition = "";
    }
    setAll(d) {
        super.setAll(d);
        this.ImagePath = this.ImagePath || "public/avatar/avatar.jpg";
        this.ImagePath = this.ImagePath.indexOf("http") >= 0 ? this.ImagePath : `/${this.ImagePath}`;
    }
}
exports.PlayListModel = PlayListModel;
