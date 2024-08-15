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
const PlayListLikeService_1 = __importDefault(require("../services/PlayListLikeService"));
class PlayListLikeController {
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.cookies.id;
            let idPlaylist = req.body.idPlaylist;
            let check = yield PlayListLikeController.playListLikeService.Add(id, idPlaylist);
            res.json({
                err: check == undefined
            });
        });
    }
    Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.cookies.id;
            let idPlaylist = req.body.idPlaylist;
            let check = yield PlayListLikeController.playListLikeService.Delete(id, idPlaylist);
            res.json({
                err: check == undefined
            });
        });
    }
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.cookies.id;
            let check = yield PlayListLikeController.playListLikeService.GetAll(id);
            res.json({
                err: check == undefined,
                ls: check
            });
        });
    }
}
PlayListLikeController.playListLikeService = PlayListLikeService_1.default;
const playListLikeController = new PlayListLikeController();
exports.default = playListLikeController;
