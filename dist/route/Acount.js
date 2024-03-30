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
exports.VerifyCookie = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const Hash_1 = require("../config/Hash");
const UserService_1 = __importDefault(require("../services/UserService"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const uuid_1 = require("uuid");
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const client_secret_si = process.env.CLIENT_SECRET_SI;
const client_id_si = process.env.CLIENT_ID_SI;
console.log("npm i dotenv", client_id_si);
const client_secret_su = process.env.CLIENT_SECRET_SU;
const client_id_su = process.env.CLIENT_ID_SU;
const Account = (0, express_1.Router)();
Account.get("/", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "/web/auth.html"));
});
Account.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body.account;
    const password = req.body.password;
    var acc = yield UserService_1.default.GetByAccount(account);
    if (!acc || acc.Password != password) {
        res.redirect("/auth");
        return;
    }
    SetCookie(res, acc);
}));
Account.get("/github", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var code = req.query.code;
    var url = `https://github.com/login/oauth/access_token?client_id=${client_id_si}&client_secret=${client_secret_si}&code=${code}`;
    var r = yield axios_1.default.post(url, {}, {
        headers: {
            Accept: "application/json",
        },
    });
    // {
    //   "access_token": "",
    //   "token_type": "",
    //   "scope": ""
    // }
    var c;
    try {
        c = yield Promise.all([
            axios_1.default.get("https://api.github.com/user/emails", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${r.data.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            }),
            axios_1.default.get("https://api.github.com/user", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${r.data.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            }),
        ]);
    }
    catch (error) {
        console.log("loo");
        res.redirect("/auth");
        return;
    }
    // [
    //   {
    //     email: "huy91027@gmail.com",
    //     primary: true,
    //     verified: true,
    //     visibility: "private",
    //   },
    //   {
    //     email: "71593544+crong964@users.noreply.github.com",
    //     primary: false,
    //     verified: true,
    //     visibility: null,
    //   },
    // ];
    //avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4'
    var acc = yield UserService_1.default.GetByAccount(c[0].data[0].email);
    if (!acc) {
        res.redirect("/auth");
        return;
    }
    SetCookie(res, acc);
}));
Account.get("/githubsu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var code = req.query.code;
    var url = `https://github.com/login/oauth/access_token?client_id=${client_id_su}&client_secret=${client_secret_su}&code=${code}`;
    var r = yield axios_1.default.post(url, {}, {
        headers: {
            Accept: "application/json",
        },
    });
    // {
    //   "access_token": "",
    //   "token_type": "",
    //   "scope": ""
    // }
    var c;
    try {
        c = yield Promise.all([
            axios_1.default.get("https://api.github.com/user/emails", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${r.data.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            }),
            axios_1.default.get("https://api.github.com/user", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${r.data.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            }),
        ]);
    }
    catch (error) {
        res.end();
        return;
    }
    // [
    //   {
    //     email: "huy91027@gmail.com",
    //     primary: true,
    //     verified: true,
    //     visibility: "private",
    //   },
    //   {
    //     email: "71593544+crong964@users.noreply.github.com",
    //     primary: false,
    //     verified: true,
    //     visibility: null,
    //   },
    // ];
    //avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4'
    var hash = Hash_1.Hash.CreateHas({
        outNumber: undefined,
        salt: undefined,
        a1: c[0].data[0].email,
    });
    res.cookie("a1", hash.a1);
    res.cookie("a2", hash.a2);
    res.cookie("time", hash.time);
    res.cookie("email", c[0].data[0].email);
    res.cookie("image", c[1].data.avatar_url);
    res.cookie("name", "");
    res.redirect("/auth");
}));
Account.post("/ggin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var g_csrf_token1 = req.body.g_csrf_token;
    var g_csrf_token2 = req.cookies.g_csrf_token;
    var profi = { email: "", name: "", picture: "" };
    if (g_csrf_token1 != g_csrf_token2) {
        res.redirect("/auth");
        return;
    }
    var s = req.body.credential;
    s.split(".").forEach((v, i) => {
        if (i == 1) {
            profi = JSON.parse(Buffer.from(v, "base64").toString());
        }
    });
    // {
    //      iss: 'https://accounts.google.com',
    //      azp: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
    //      aud: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
    //      sub: '104614040852490738418',
    //      email: 'huy91027@gmail.com',
    //      email_verified: true,
    //      nbf: 1711446780,
    //      name: 'Huy Nguyễn',
    //      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNfMWE2gocEli3yYxs-95uRjnX_8PeHAtb3gtpFr8S_g=s96-c',
    //      given_name: 'Huy',
    //      family_name: 'Nguyễn',
    //      iat: 1711447080,
    //      exp: 1711450680,
    //      jti: 'e17866e1397730421a8823d244726469f9ea63bd'
    //    }
    var acc = yield UserService_1.default.GetByAccount(profi.email);
    if (!acc) {
        res.redirect("/auth");
        return;
    }
    SetCookie(res, acc);
}));
Account.post("/ggup", (req, res) => {
    var g_csrf_token1 = req.body.g_csrf_token;
    var g_csrf_token2 = req.cookies.g_csrf_token;
    var profi = { email: "", name: "", picture: "" };
    if (g_csrf_token1 != g_csrf_token2) {
        res.redirect("/auth");
        return;
    }
    var s = req.body.credential;
    s.split(".").forEach((v, i) => {
        if (i == 1) {
            profi = JSON.parse(Buffer.from(v, "base64").toString());
        }
    });
    // {
    //      iss: 'https://accounts.google.com',
    //      azp: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
    //      aud: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
    //      sub: '104614040852490738418',
    //      email: 'huy91027@gmail.com',
    //      email_verified: true,
    //      nbf: 1711446780,
    //      name: 'Huy Nguyễn',
    //      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNfMWE2gocEli3yYxs-95uRjnX_8PeHAtb3gtpFr8S_g=s96-c',
    //      given_name: 'Huy',
    //      family_name: 'Nguyễn',
    //      iat: 1711447080,
    //      exp: 1711450680,
    //      jti: 'e17866e1397730421a8823d244726469f9ea63bd'
    //    }
    var hash = Hash_1.Hash.CreateHas({
        outNumber: undefined,
        salt: undefined,
        a1: profi.email,
    });
    console.log(profi);
    res.cookie("a1", hash.a1);
    res.cookie("a2", hash.a2);
    res.cookie("time", hash.time);
    res.cookie("email", profi.email);
    res.cookie("image", profi.picture);
    res.cookie("name", profi.name);
    res.redirect("/auth");
});
Account.post("/logout", (req, res) => {
    clearCookie(res);
    res.redirect("/auth");
});
Account.post("/getdata", (req, res) => {
    if (req.cookies.name == undefined) {
        res.json({
            err: true,
        });
        return;
    }
    var time = parseInt(req.cookies.time);
    var time1 = new Date().getTime();
    if (time1 - time > 60000) {
        res.json({
            err: true,
        });
        return;
    }
    res.clearCookie("Name");
    res.clearCookie("image");
    res.clearCookie("email");
    res.json({
        err: false,
        page: "signup",
        Name: req.cookies.name,
        pathImage: req.cookies.image,
        Account: req.cookies.email,
    });
});
Account.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var d = new UserModel_1.default();
    d.setAll(req.body);
    d.Account = req.body.Account;
    d.Password = req.body.Password;
    d.id = (0, uuid_1.v4)();
    yield UserService_1.default.AddAccount(d);
    res.json({
        err: false
    });
}));
Account.post("/sendcode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var account = req.body.account;
    console.log(account);
    var d = yield UserService_1.default.GetByAccount(account);
    if (d == undefined) {
        res.json({
            err: true,
            mess: "không tồn tại"
        });
        return;
    }
    var code = new Date().getTime() % 100000;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "huy91027@gmail.com",
            pass: "tltl bfzr txhs uvav",
        },
    });
    const info = yield transporter.sendMail({
        from: 'spotify@gmail.com.com',
        to: account,
        subject: "Mã Xác thực",
        text: "Hello world?",
        html: `<h1>${code}</h1>`,
    });
    var hash = Hash_1.Hash.CreateHas({ a1: `${code} ${account}`, outNumber: 20, salt: undefined });
    res.cookie("f1", account, { httpOnly: true, sameSite: "strict", secure: true });
    res.cookie("f2", hash.a2, { httpOnly: true, sameSite: "strict", secure: true });
    res.cookie("timef", hash.time, { httpOnly: true, sameSite: "strict", secure: true });
    res.json({
        err: false
    });
}));
Account.post("/vertifycode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies);
    console.log(req.body);
    var code = req.body.code;
    var account = req.cookies.f1;
    var f2 = req.cookies.f2;
    var timef = req.cookies.timef;
    var verified = Hash_1.Hash.vertify({ a1: `${code} ${account}`, a2: f2, createTime: timef, outNumber: 20, salt: undefined });
    if ((new Date().getTime()) - parseInt(timef) > 60000) {
        res.json({
            err: true,
            mess: "Quá hạn"
        });
        return;
    }
    if (verified) {
        var d = new UserModel_1.default();
        d.Account = account;
        d.Password = req.body.Password;
        var check = yield UserService_1.default.UpdatePassword(d);
        res.json({
            err: check == undefined
        });
        return;
    }
    res.json({
        err: true,
        mess: "Mã không chính xác"
    });
}));
Account.post("/updatePW", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var Password = req.body.Password;
    var Account = req.body.Account;
    var d = new UserModel_1.default();
    d.Account = Account;
    d.Password = Password;
    var check = yield UserService_1.default.UpdatePassword(d);
    res.json({
        err: check == undefined
    });
}));
function SetCookie(res, acc) {
    var hash = Hash_1.Hash.CreateHas({ a1: acc.id, outNumber: undefined, salt: undefined });
    res.cookie("id", acc.id, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true });
    res.cookie("a2", hash.a2, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true });
    res.cookie("timeSIN", hash.time, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true });
    res.redirect("/");
}
function clearCookie(res) {
    res.clearCookie("id");
    res.clearCookie("a2");
    res.clearCookie("timeSIN");
}
function VerifyCookie(req) {
    var id = req.cookies.id;
    var a2 = req.cookies.a2;
    var timeSIN = req.cookies.timeSIN;
    if (!id || !a2 || !timeSIN) {
        return false;
    }
    return Hash_1.Hash.vertify({ a1: id, a2: a2, createTime: timeSIN, outNumber: undefined, salt: undefined });
}
exports.VerifyCookie = VerifyCookie;
exports.default = Account;
