"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SongController_1 = __importDefault(require("../controller/SongController"));
const SongRoute = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (0, path_1.join)(process.cwd(), "/public/image"));
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
SongRoute.post("/Update", upload.single("avatar"), SongController_1.default.Update); //0k
SongRoute.post("/Upload", SongController_1.default.Upload); //0k
SongRoute.post("/SongList", SongController_1.default.SongList); //0k
SongRoute.post("/get", SongController_1.default.GetSong); //0k
SongRoute.post("/NewUpdate", upload.single("avatar"), SongController_1.default.NewUpdate); //0k
SongRoute.post("/newupload", SongController_1.default.NewUpload);
SongRoute.post("/upStatus", SongController_1.default.UpStatus); //0k
SongRoute.get("/valisong/:idpage", SongController_1.default.GetValidateAll);
//admin
SongRoute.post("/GetSongByGenre", SongController_1.default.GetSongByGenre); //0k
exports.default = SongRoute;
