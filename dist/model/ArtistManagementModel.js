"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("./UserModel"));
class ArtistManagementModel extends UserModel_1.default {
    constructor() {
        super();
        this.idArtist = "";
    }
}
exports.default = ArtistManagementModel;
