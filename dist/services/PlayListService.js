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
exports.PlayListService = void 0;
const PlayListDatabase_1 = __importDefault(require("../database/PlayListDatabase"));
const PlayListModel_1 = require("../model/PlayListModel");
class PlayListService {
    constructor(playlist) {
        this.playlist = playlist;
    }
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.playlist.Add(d);
            console.log(check);
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.playlist.Get(id);
            var ls = this.SetLs(check);
            return ls.length > 0 ? ls[0] : undefined;
        });
    }
    GetByGenre(Genre_ID, s, f) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.playlist.GetByGenre(Genre_ID, s, f);
            return this.SetLs(ls);
        });
    }
    GetByUser_id(User_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.playlist.GetByUser_id(User_id);
            return this.SetLs(ls);
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.playlist.Update(d);
            return check;
        });
    }
    SetLs(ls) {
        if (ls == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new PlayListModel_1.PlayListModel();
            tem.setAll(element);
            list.push(tem);
        }
        return list;
    }
}
exports.PlayListService = PlayListService;
var playListService = new PlayListService(new PlayListDatabase_1.default());
exports.default = playListService;
