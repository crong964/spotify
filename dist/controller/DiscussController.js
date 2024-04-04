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
const DiscussService_1 = __importDefault(require("../services/DiscussService"));
const DiscussModel_1 = __importDefault(require("../model/DiscussModel"));
const uuid_1 = require("uuid");
class DiscussController {
    PostDisscus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = new DiscussModel_1.default();
            d.setAll(req.body);
            d.Type = "0";
            d.Discuss_Id = `discuss-${(0, uuid_1.v4)()}`;
            d.User_Id = req.cookies.id;
            var check = yield DiscussController.disscuss.Add(d);
            res.json({
                err: check == undefined
            });
        });
    }
    PostReplay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = new DiscussModel_1.default();
            d.setAll(req.body);
            d.Type = "1";
            d.Discuss_Id = `discuss-${(0, uuid_1.v4)()}`;
            d.User_Id = req.cookies.id;
            var check1 = yield DiscussController.disscuss.Increase(d.Parent_discuss_Id);
            if (check1) {
                var check2 = yield DiscussController.disscuss.Add(d);
            }
            res.json({
                err: check1 == undefined
            });
        });
    }
    GetMainDiscuss(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var SongId = req.body.SongId;
            var ls = yield DiscussController.disscuss.GetMainDiscussBySong_Id(SongId);
            res.json({
                ls: ls,
                err: false
            });
        });
    }
    GetReplayDiscuss(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var Parent_discuss_Id = req.body.ParentId;
            var ls = yield DiscussController.disscuss.GetReplayDiscussByParentDiscussId(Parent_discuss_Id);
            res.json({
                ls: ls,
                err: false
            });
        });
    }
}
DiscussController.disscuss = DiscussService_1.default;
const discussController = new DiscussController();
exports.default = discussController;
