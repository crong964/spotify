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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs_1 = require("fs");
const googleapis_1 = require("googleapis");
const Type = process.env.TypeGGDrive;
const Client_id = process.env.Client_idGGDrive;
const Client_secret = process.env.Client_secretGGDrive;
const Refresh_token = process.env.Refresh_tokenGGDrive;
class GoogleDrive {
    constructor() {
    }
    DownloadStreamFile(id) {
        return GoogleDrive.service.files.get({ fileId: id || "12", alt: "media" }, { responseType: "stream" });
    }
    DownloadFile(id) {
        return GoogleDrive.service.files.get({ fileId: id, alt: "media" });
    }
    SearchNameFile(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                GoogleDrive.service.files.list({ q: `name contains '${name}'` })
                    .then((v) => {
                    let ls = [];
                    let files = v.data.files;
                    if (files) {
                        for (let i = 0; i < files.length; i++) {
                            const element = files[i];
                            if (element.id) {
                                ls.push(element.id);
                            }
                        }
                    }
                    res(ls);
                })
                    .catch((v) => {
                    console.log(v);
                    res([]);
                });
            });
        });
    }
    CreateFoder(name) {
        return new Promise((res, rej) => {
            GoogleDrive.service.files.create({
                requestBody: {
                    name: name,
                    mimeType: "application/vnd.google-apps.folder"
                },
                fields: "id"
            }).then((v) => {
                res({ id: v.data.id, err: undefined });
            }).catch((v) => {
                res({ id: undefined, err: v });
            });
        });
    }
    CreateTxt(name, idparent, data) {
        return new Promise((res, rej) => {
            GoogleDrive.service.files.create({
                requestBody: {
                    name: name,
                    parents: [idparent]
                },
                media: {
                    body: data,
                    mimeType: "text/txt"
                },
                fields: "id"
            }).then((v) => {
                res({ id: v.data.id, err: undefined });
            }).catch((v) => {
                res({ id: undefined, err: v });
            });
        });
    }
    UploadStream(path, name, idparent) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                GoogleDrive.service.files.create({
                    requestBody: {
                        name: name,
                        parents: [idparent]
                    }, media: {
                        body: (0, fs_1.createReadStream)(path),
                        mimeType: "application/octet-stream"
                    }
                })
                    .then((v) => {
                    res(v.data.id);
                })
                    .catch((v) => {
                    res(undefined);
                });
            });
        });
    }
    SearchNameFolder(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                GoogleDrive.service.files.list({ q: `trashed = false and mimeType = 'application/vnd.google-apps.folder' and name = '${name}'` })
                    .then((v) => {
                    let ls = [];
                    let files = v.data.files;
                    if (files) {
                        for (let i = 0; i < files.length; i++) {
                            const element = files[i];
                            if (element.id) {
                                ls.push(element.id);
                            }
                        }
                    }
                    res(ls);
                })
                    .catch((v) => {
                    console.log(v);
                    res([]);
                });
            });
        });
    }
    Trashed(idfolder) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                GoogleDrive.service.files.update({
                    fileId: idfolder,
                    requestBody: { "trashed": true }
                })
                    .then((v) => {
                    res(true);
                })
                    .catch((v) => {
                    res(false);
                    console.log();
                });
            });
        });
    }
}
GoogleDrive.service = googleapis_1.google.drive({
    version: "v3", auth: googleapis_1.google.auth.fromJSON({
        "type": Type,
        "client_id": Client_id,
        "client_secret": Client_secret,
        "refresh_token": Refresh_token
    })
});
const googleDrive = new GoogleDrive();
exports.default = googleDrive;
