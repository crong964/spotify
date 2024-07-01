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
require("dotenv/config");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const storage_1 = require("firebase-admin/storage");
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const PROJECTID = process.env.PROJECTID;
const CLIENTMAIL = process.env.CLIENTMAIL;
const PRIVATEKEY = process.env.PRIVATEKEY;
const DATABASEURL = process.env.DATABASEURL;
const STORAGEBUCKET = process.env.STORAGEBUCKET;
const defaultApp = firebase_admin_1.default.initializeApp({
    databaseURL: DATABASEURL,
    credential: firebase_admin_1.default.credential.cert({
        clientEmail: CLIENTMAIL,
        privateKey: PRIVATEKEY,
        projectId: PROJECTID
    })
});
class Firebase {
    constructor() {
    }
    /*
    https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/g%2Fa.png?alt=media&token=51ef5ff0-f858-4adc-a7f5-9bba021c0131
    **/
    UploadImageBuffer(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let percentOutput = 100;
            if (data.length > 40000) {
                percentOutput = parseInt((40000 / data.length) * 100 + "");
            }
            return new Promise((res, rea) => {
                (0, sharp_1.default)(data).
                    jpeg({ force: true, quality: percentOutput, progressive: true })
                    .png({ palette: true, quality: 1, compressionLevel: 9, progressive: true, force: false })
                    .toBuffer((err, buffer, infor) => {
                    if (err) {
                        rea(err);
                        return;
                    }
                    var g = `${name}.jpeg`;
                    let w = Firebase.bucket.file(g)
                        .createWriteStream().on("finish", () => __awaiter(this, void 0, void 0, function* () {
                        var nameURL = yield (0, storage_1.getDownloadURL)(Firebase.bucket.file(g));
                        res(nameURL);
                    }));
                    w.write(buffer, (err) => {
                        if (err) {
                            rea(err);
                            return;
                        }
                    });
                    w.end();
                });
            });
        });
    }
    UploadImageBufferNoZip(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                (0, sharp_1.default)(data).jpeg({ force: true, progressive: true }).png({ palette: true, progressive: true, force: false })
                    .toBuffer((err, buffer, infor) => {
                    if (err) {
                        console.log(err);
                        rej("err");
                        return;
                    }
                    var g = `${name}.jpeg`;
                    let w = Firebase.bucket.file(g)
                        .createWriteStream().on("finish", () => __awaiter(this, void 0, void 0, function* () {
                        var nameURL = yield (0, storage_1.getDownloadURL)(Firebase.bucket.file(g));
                        res(nameURL);
                    }));
                    w.write(buffer, (err) => {
                        if (err) {
                            console.log(err);
                            rej("err");
                            return;
                        }
                    });
                    w.end();
                });
            });
        });
    }
    UploadStream(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                var r = (0, fs_1.createReadStream)(path);
                var w = Firebase.bucket.file(name).createWriteStream();
                w.on("finish", () => {
                    res(name);
                });
                r.on("error", (err) => {
                    rej(err);
                });
                r.pipe(w);
            });
        });
    }
    GetMeta(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var meta;
            try {
                meta = yield Firebase.bucket.file(name).getMetadata();
            }
            catch (error) {
                console.log(error);
            }
            return meta === null || meta === void 0 ? void 0 : meta[0];
        });
    }
    DownloadStreamFile(name, start, end) {
        return Firebase.bucket.file(name).createReadStream({ start: start, end: end });
    }
    MoveImage(source, dist) {
        return __awaiter(this, void 0, void 0, function* () {
            let check;
            try {
                check = yield Firebase.bucket.file(`${source}.jpeg`).move(`${dist}.jpeg`);
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    Move(source, dist) {
        return __awaiter(this, void 0, void 0, function* () {
            let check;
            try {
                check = yield Firebase.bucket.file(`${source}`).move(`${dist}`);
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
}
Firebase.bucket = defaultApp.storage().bucket(STORAGEBUCKET);
const firebase = new Firebase();
exports.default = firebase;
