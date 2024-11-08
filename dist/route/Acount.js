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
const Hash_1 = require("../config/Hash");
const UserService_1 = __importDefault(require("../services/UserService"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const uuid_1 = require("uuid");
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const Helper_1 = require("../config/Helper");
const PlayListService_1 = __importDefault(require("../services/PlayListService"));
const PlayListModel_1 = require("../model/PlayListModel");
const AccountService_1 = __importDefault(require("../services/AccountService"));
const AccountModel_1 = __importDefault(require("../model/AccountModel"));
const client_secret_si = process.env.CLIENT_SECRET_SI;
const client_id_si = process.env.CLIENT_ID_SI;
const client_secret_su = process.env.CLIENT_SECRET_SU;
const client_id_su = process.env.CLIENT_ID_SU;
const email = process.env.EMAIL;
const emailpsapp = process.env.EMAILPSAPP;
const secret = process.env.SECRET;
const client_id_gg = process.env.Client_ID_GG;
const Account = (0, express_1.Router)();
// Account.get("/", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "/web/auth.html"));
// });
Account.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body.account;
    const password = req.body.password;
    if (password == "") {
        res.redirect("/athu");
        return;
    }
    let acc = yield AccountService_1.default.GetAccount(account);
    if (!acc || acc.Password != password) {
        res.json({
            err: true,
            mess: "Tài khoản hoặc mật khẩu không đúng"
        });
        return;
    }
    let user = yield UserService_1.default.Get(acc.id);
    if (!user) {
        res.json({
            err: true,
            mess: "Không có người dùng này"
        });
        return;
    }
    SetCookie(res, user);
    if (user.role == "master") {
        res.redirect("/admin");
        return;
    }
    res.redirect("/");
})); //0k 
Account.get("/github", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let code = req.query.code;
    let url = `https://github.com/login/oauth/access_token?client_id=${client_id_si}&client_secret=${client_secret_si}&code=${code}`;
    let r = yield axios_1.default.post(url, {}, {
        headers: {
            Accept: "application/json",
        },
    });
    // {
    //   "access_token": "",
    //   "token_type": "",
    //   "scope": ""
    // }
    let c;
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
        console.log(error);
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
    let acc = yield AccountService_1.default.GetAccount(c[0].data[0].email);
    if (!acc) {
        res.redirect("/auth");
        return;
    }
    let user = yield UserService_1.default.Get(acc.id);
    if (!user) {
        res.redirect("/auth");
        return;
    }
    SetCookie(res, user);
    res.redirect("/");
}));
Account.get("/githubsu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let code = req.query.code;
    let url = `https://github.com/login/oauth/access_token?client_id=${client_id_su}&client_secret=${client_secret_su}&code=${code}`;
    let r = yield axios_1.default.post(url, {}, {
        headers: {
            Accept: "application/json",
        },
    });
    // {
    //   "access_token": "",
    //   "token_type": "",
    //   "scope": ""
    // }
    // {
    //      login: 'crong964',
    //      id: 71593544,
    //      node_id: 'MDQ6VXNlcjcxNTkzNTQ0',
    //      avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4',
    //      gravatar_id: '',
    //      url: 'https://api.github.com/users/crong964',
    //      html_url: 'https://github.com/crong964',
    //      followers_url: 'https://api.github.com/users/crong964/followers',
    //      following_url: 'https://api.github.com/users/crong964/following{/other_user}',
    //      gists_url: 'https://api.github.com/users/crong964/gists{/gist_id}',
    //      starred_url: 'https://api.github.com/users/crong964/starred{/owner}{/repo}',
    //      subscriptions_url: 'https://api.github.com/users/crong964/subscriptions',
    //      organizations_url: 'https://api.github.com/users/crong964/orgs',
    //      repos_url: 'https://api.github.com/users/crong964/repos',
    //      events_url: 'https://api.github.com/users/crong964/events{/privacy}',
    //      received_events_url: 'https://api.github.com/users/crong964/received_events',
    //      type: 'User',
    //      site_admin: false,
    //      name: null,
    //      company: null,
    //      blog: '',
    //      location: null,
    //      email: null,
    //      hireable: null,
    //      bio: null,
    //      twitter_username: null,
    //      public_repos: 16,
    //      public_gists: 0,
    //      followers: 0,
    //      following: 0,
    //      created_at: '2020-09-20T12:19:07Z',
    //      updated_at: '2024-03-30T02:12:41Z'
    //    }
    let c;
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
    let acc = yield AccountService_1.default.GetAccount(c[0].data[0].email);
    if (acc) {
        res.redirect("/auth");
        return;
    }
    let hash = Hash_1.Hash.CreateHas({
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
    res.cookie("idgithug", c[1].data.id);
    res.cookie("type", "githug");
    res.redirect("/auth");
}));
Account.post("/ggin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let g_csrf_token1 = req.body.g_csrf_token;
    let g_csrf_token2 = req.cookies.g_csrf_token;
    if (g_csrf_token1 != g_csrf_token2) {
        res.redirect("/auth");
        return;
    }
    let s = req.body.credential;
    let payload = yield (0, Helper_1.VerifyGoogleIDtoken)(s);
    if (payload == undefined || payload.email == undefined) {
        res.redirect("/auth/Signup");
        return;
    }
    let acc = yield AccountService_1.default.GetAccount(payload.email);
    if (!acc) {
        res.redirect("/auth");
        return;
    }
    let user = yield UserService_1.default.Get(acc.id);
    if (!user) {
        res.redirect("/auth");
        return;
    }
    SetCookie(res, user);
    res.redirect("/");
}));
//đăng ký gg
Account.post("/ggup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let g_csrf_token1 = req.body.g_csrf_token;
    let g_csrf_token2 = req.cookies.g_csrf_token;
    let profi = { email: "", name: "", picture: "" };
    if (g_csrf_token1 != g_csrf_token2) {
        res.redirect("/auth");
        return;
    }
    let s = req.body.credential;
    let payload = yield (0, Helper_1.VerifyGoogleIDtoken)(s);
    if (payload == undefined || payload.email == undefined) {
        res.redirect("/auth/Signup?dk=khongthanhcong");
        return;
    }
    let acc = yield AccountService_1.default.GetAccount(payload.email);
    if (acc) {
        res.redirect("/auth/Signup?dk=taikhoantontai");
        return;
    }
    let id = `user-${(0, uuid_1.v4)()}-${Date.now()}`;
    let u = new UserModel_1.default();
    u.id = id;
    u.pathImage = payload.picture || "";
    u.ChanalName = payload.name || "";
    u.Name = payload.name || "";
    let ac = new AccountModel_1.default();
    ac.Account = payload.email;
    ac.Password = "";
    ac.id = u.id;
    let pl = new PlayListModel_1.PlayListModel();
    pl.User_id = u.id;
    pl.ImagePath = u.pathImage;
    pl.id = u.id;
    pl.Status = "0";
    pl.Type = "user";
    pl.PlayListName = u.ChanalName;
    yield PlayListService_1.default.AddArtists(pl);
    u.id = id;
    ac.id = id;
    let check = yield UserService_1.default.AddAccount(u);
    if (check) {
        check = yield AccountService_1.default.Add(ac.id, ac.Account, ac.Password);
    }
    else {
        UserService_1.default.Delete(u.id);
        PlayListService_1.default.DeletePlaylist(pl.id);
    }
    res.redirect("/auth");
}));
Account.get("/logout", (req, res) => {
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
    let time = parseInt(req.cookies.time);
    let time1 = new Date().getTime();
    if (time1 - time > 60000) {
        res.json({
            err: true,
        });
        return;
    }
    res.clearCookie("name");
    res.clearCookie("image");
    res.clearCookie("email");
    let sign = (0, Helper_1.SignJWT)(JSON.stringify({
        Name: req.cookies.name,
        pathImage: req.cookies.image,
        Account: req.cookies.email,
    }));
    res.json({
        err: false,
        Name: req.cookies.name,
        pathImage: req.cookies.image,
        Account: req.cookies.email,
        Sign: sign
    });
});
Account.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let acc = new AccountModel_1.default();
    let user = new UserModel_1.default();
    acc.setAll(req.body);
    user.setAll(req.body);
    acc.Account = req.body.Account;
    acc.Password = req.body.Password;
    let id = `user-${(0, uuid_1.v4)()}-${Date.now()}`;
    if ((0, Helper_1.VertifyJWT)(req.body.sign) == undefined) {
        res.json({
            err: true
        });
        return;
    }
    user.id = id;
    acc.id = id;
    let check = yield UserService_1.default.AddAccount(user);
    if (!check) {
        res.json({
            err: true
        });
    }
    check = yield AccountService_1.default.Add(acc.id, acc.Account, acc.Password);
    let pl = new PlayListModel_1.PlayListModel();
    pl.User_id = user.id;
    pl.ImagePath = user.pathImage;
    pl.id = user.id;
    pl.Status = "0";
    pl.PlayListName = user.Name;
    yield PlayListService_1.default.AddArtists(pl);
    res.json({
        err: false
    });
}));
Account.post("/sendcode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let account = req.body.account;
    let acc = yield AccountService_1.default.GetAccount(account);
    if (acc == undefined) {
        res.json({
            err: true,
            mess: "không tồn tại"
        });
        return;
    }
    let code = new Date().getTime() % 100000;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: emailpsapp,
        },
    });
    const info = yield transporter.sendMail({
        from: 'spotify@gmail.com.com',
        to: account,
        subject: "Mã Xác thực đổi mật khẩu",
        text: "Đây là mã xác thực của bạn đừng chia sẻ cho ai",
        html: `<h1>${code}</h1>`,
    });
    let hash = Hash_1.Hash.CreateHas({ a1: `${code} ${account}`, outNumber: 20, salt: undefined });
    hash.a1 = account;
    let token = Buffer.from(JSON.stringify({
        f1: account,
        f2: hash.a2,
        timef: hash.time
    })).toString("base64");
    res.cookie("f1", account, { httpOnly: true, sameSite: "strict", secure: true });
    res.cookie("f2", hash.a2, { httpOnly: true, sameSite: "strict", secure: true });
    res.cookie("timef", hash.time, { httpOnly: true, sameSite: "strict", secure: true });
    res.json({
        err: false,
        token: token
    });
})); //0k
Account.post("/vertifycode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let code = req.body.code;
    let token = req.body.token;
    if (token != undefined) {
        req.cookies = JSON.parse(Buffer.from(token, "base64").toString());
    }
    let account = req.cookies.f1;
    let f2 = req.cookies.f2;
    let timef = req.cookies.timef;
    let verified = Hash_1.Hash.vertify({ a1: `${code} ${account}`, a2: f2, createTime: timef, outNumber: 20, salt: undefined });
    if ((new Date().getTime()) - parseInt(timef) > 60000) {
        res.json({
            err: true,
            mess: "Quá hạn"
        });
        return;
    }
    if (verified) {
        let acc = new AccountModel_1.default();
        acc.Account = account;
        acc.Password = req.body.Password;
        let check = yield AccountService_1.default.UpdatePassword(acc.Account, acc.Password);
        res.json({
            err: check == undefined,
            mess: "thành công"
        });
        return;
    }
    res.json({
        err: true,
        mess: "Mã không chính xác"
    });
})); //0k
Account.post("/apikey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body.account;
    const password = req.body.password;
    let acc = yield AccountService_1.default.GetAccount(account);
    if (!acc || acc.Password != password) {
        res.json({
            err: true,
            mess: "Tài khoản hoặc mật khẩu không đúng"
        });
        return;
    }
    let user = yield UserService_1.default.Get(acc.id);
    if (!user) {
        res.json({
            err: true,
            mess: "Tài khoản hoặc mật khẩu không đúng"
        });
        return;
    }
    let apikey = jsonwebtoken_1.default.sign({ role: user.role, id: acc.id }, secret || "1", { expiresIn: "2 days" });
    res.json({
        err: false,
        apikey: apikey
    });
})); //0k
Account.post("/sendCodeVertifyEmail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let account = req.body.account;
    let acc = yield AccountService_1.default.GetAccount(account);
    if (account == undefined) {
        res.json({
            err: true,
            mess: "chưa nhập tài khoản"
        });
        return;
    }
    if (acc != undefined) {
        res.json({
            err: true,
            mess: "tài khoản đã tồn tại"
        });
        return;
    }
    let code = new Date().getTime() % 100000;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: emailpsapp,
        },
    });
    let info = undefined;
    try {
        info = yield transporter.sendMail({
            from: 'spotify@gmail.com.com',
            to: account,
            subject: "Mã Xác thực email",
            text: "Đây là mã xác thực của bạn đừng chia sẻ cho ai",
            html: `<h1>${code}</h1>`,
        });
    }
    catch (error) {
    }
    let token = jsonwebtoken_1.default.sign({ Account: account }, code + (secret || "888"), {
        expiresIn: "3h"
    });
    res.json({
        err: info == undefined,
        token: token
    });
})); //0k
Account.post("/createACC", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Account = req.body.Account;
    let code = req.body.code;
    let token = req.body.token;
    let id = `user-${(0, uuid_1.v4)()}-${Date.now()}`;
    let decode = (0, Helper_1.VertifyJWT)(token, code + (secret || "888"));
    if (decode == undefined) {
        res.json({
            err: true,
            mess: "MÃ KO ĐÚNG"
        });
        return;
    }
    if (decode.Account != Account) {
        res.json({
            err: true,
            mess: "GMAIL KHÔNG ĐÚNG"
        });
        return;
    }
    let acc_check = yield AccountService_1.default.GetAccount(Account);
    if (acc_check != undefined) {
        res.json({
            err: true,
            mess: "tài khoản đã tồn tại"
        });
        return;
    }
    let u = new UserModel_1.default();
    u.setAll(req.body);
    let acc = new AccountModel_1.default();
    acc.setAll(req.body);
    let pl = new PlayListModel_1.PlayListModel();
    pl.User_id = u.id;
    pl.ImagePath = u.pathImage;
    pl.id = u.id;
    pl.Status = "0";
    pl.PlayListName = u.Name;
    yield PlayListService_1.default.AddArtists(pl);
    u.id = id;
    acc.id = id;
    let check = yield UserService_1.default.AddAccount(u);
    if (!check) {
        check = yield AccountService_1.default.Add(acc.id, acc.Account, acc.Password);
    }
    res.json({
        err: check == undefined,
    });
})); //0k
function SetCookie(res, acc) {
    let apikey = jsonwebtoken_1.default.sign({ role: acc.role, id: acc.id }, secret || '1', { expiresIn: "10 days" });
    res.cookie("apikey", apikey, { maxAge: 900000000 });
}
function SetApiKey(res, acc) {
    let hash = Hash_1.Hash.CreateHas({ a1: acc.id, outNumber: undefined, salt: undefined });
    return hash;
}
function clearCookie(res) {
    res.clearCookie("id");
    res.clearCookie("a2");
    res.clearCookie("timeSIN");
    res.clearCookie("apikey");
}
function VerifyCookie(req) {
    let id = req.cookies.id;
    let a2 = req.cookies.a2;
    let timeSIN = req.cookies.timeSIN;
    if (!id || !a2 || !timeSIN) {
        return false;
    }
    return Hash_1.Hash.vertify({ a1: id, a2: a2, createTime: timeSIN, outNumber: undefined, salt: undefined });
}
exports.VerifyCookie = VerifyCookie;
exports.default = Account;
