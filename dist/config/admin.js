"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function ADMIN(req, res, next) {
    var apikey = req.headers.apikey || req.cookies.apikey;
    if (!apikey) {
        res.status(403).send({
            mess: "ko có quyền "
        });
        return;
    }
    var decode = jsonwebtoken_1.default.verify(apikey, "1");
    if (decode.role == "master") {
        next();
        return;
    }
    res.status(403).send({
        mess: "ko có quyền "
    });
}
exports.default = ADMIN;
