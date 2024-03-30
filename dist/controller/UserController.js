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
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
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
                err: false,
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
            var ls = yield UserController.service.Get(req.params.artisepage);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
}
UserController.service = UserService_1.default;
exports.default = new UserController;
