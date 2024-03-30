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
SongRoute.post("/Update", upload.single("avatar"), SongController_1.default.Update);
SongRoute.post("/Upload", SongController_1.default.Upload);
SongRoute.post("/SongList", SongController_1.default.SongList);
SongRoute.post("/get", SongController_1.default.GetSong);
SongRoute.post("/NewUpdate", upload.single("avatar"), SongController_1.default.NewUpdate);
SongRoute.post("/newupload", SongController_1.default.NewUpload);
SongRoute.post("/upStatus", SongController_1.default.UpStatus);
SongRoute.get("/valisong/:idpage", SongController_1.default.GetValidateAll);
//admin
SongRoute.post("/GetSongByGenre", SongController_1.default.GetSongByGenre);
exports.default = SongRoute;
