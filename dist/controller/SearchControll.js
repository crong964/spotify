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
const LikedSongService_1 = __importDefault(require("../services/LikedSongService"));
const UserService_1 = __importDefault(require("../services/UserService"));
class SearchControll {
    constructor() {
    }
    SearchName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var name = req.body.name;
            var id = req.cookies.id;
            var ls = yield Promise.all([SearchControll.likedSong.SearchName(name, id), SearchControll.user.SearchName(name)]);
            res.json({
                ls: ls[0],
                artise: ls[1]
            });
        });
    }
}
SearchControll.user = UserService_1.default;
SearchControll.likedSong = LikedSongService_1.default;
var searchControll = new SearchControll();
exports.default = searchControll;
