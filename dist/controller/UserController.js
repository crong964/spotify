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
const path_1 = require("path");
const UserModel_1 = __importDefault(require("../model/UserModel"));
const UserService_1 = __importDefault(require("../services/UserService"));
const promises_1 = require("fs/promises");
const HaveListFriendsService_1 = __importDefault(require("../services/HaveListFriendsService"));
class UserController {
    constructor() {
    }
    SignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var account = req.query.account;
            if (!account) {
            }
            var check = yield UserController.service.GetByAccount(account);
            res.cookie("id", check === null || check === void 0 ? void 0 : check.id, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true });
            res.redirect("http://localhost:8000/dashboard");
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.cookies.id;
            var use = yield UserController.service.Get(id);
            if (use) {
                use.Account = "";
                res.json({
                    err: false,
                    u: use
                });
                return;
            }
            res.json({
                err: true,
                u: use
            });
        });
    }
    getAllArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield UserController.service.getAllArtist("1");
            res.json({
                err: false,
                ls: ls
            });
        });
    }
    getArtisePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idartise = req.params.artisepage;
            var id = req.cookies.id;
            var l = yield Promise.all([UserController.service.Get(idartise),
                UserController.HaveListFriends.Get(id, idartise)]);
            res.json({
                err: false,
                ls: l[0],
                isfriend: l[1] ? l[1].IsFriend : "-1"
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = new UserModel_1.default();
            var olduer = yield UserController.service.Get(req.cookies.id);
            if (!olduer) {
                res.json({
                    err: true
                });
                return;
            }
            d.setAll(olduer);
            d.setAll(req.body);
            if (req.file) {
                d.pathImage = (0, path_1.join)("/public/avatar", req.file.filename);
                try {
                    yield (0, promises_1.unlink)((0, path_1.join)(process.cwd(), olduer.pathImage));
                }
                catch (error) {
                    console.log(error);
                }
            }
            var check = yield UserController.service.Update(d);
            res.json({
                err: check == undefined
            });
        });
    }
}
UserController.service = UserService_1.default;
UserController.HaveListFriends = HaveListFriendsService_1.default;
exports.default = new UserController();
