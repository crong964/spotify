"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class RecentPlaylistModel extends BaseModel_1.default {
    constructor() {
        super();
        this.User_ID = "";
        this.ID = "";
        this.CreateTime = "";
        this.PlayListName = "";
        this.Type = "";
        this.ImagePath = "";
    }
}
exports.default = RecentPlaylistModel;
