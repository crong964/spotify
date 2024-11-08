"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER = void 0;
require("dotenv/config");
const Helper_1 = require("./Helper");
const SECRET = process.env.SECRET;
function ADMIN(req, res, next) {
    var apikey = req.headers.apikey || req.cookies.apikey;
    if (!apikey) {
        res.redirect("/auth");
        return;
    }
    var decode = (0, Helper_1.VertifyJWT)(apikey);
    if (decode == undefined) {
        res.redirect("/auth");
        return;
    }
    if (decode.role == "master") {
        next();
        return;
    }
    res.redirect("/auth");
}
exports.default = ADMIN;
function USER(req, res, next) {
    var apikey = req.headers.apikey || req.cookies.apikey;
    if (!apikey || !(0, Helper_1.VertifyJWT)(apikey)) {
        res.json({ err: true });
        return;
    }
    var decode = (0, Helper_1.VertifyJWT)(apikey);
    if (!decode || !decode.id) {
        res.json({ err: true });
        return;
    }
    next();
}
exports.USER = USER;
