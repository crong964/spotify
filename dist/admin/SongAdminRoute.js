"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SongAdminController_1 = __importDefault(require("../controllerAdmin/SongAdminController"));
const multer_1 = __importDefault(require("multer"));
const SongAdminRoute = (0, express_1.Router)();
const memory = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: memory }).single("avatar");
SongAdminRoute.post("/", SongAdminController_1.default.SongListAndInforArtist);
SongAdminRoute.post("/uploadfile", SongAdminController_1.default.Upload);
SongAdminRoute.post("/infor", SongAdminController_1.default.SongListAndInforArtist);
SongAdminRoute.post("/addSong", upload, SongAdminController_1.default.Add);
SongAdminRoute.post("update", SongAdminController_1.default.Update);
SongAdminRoute.post("/updateStatus", SongAdminController_1.default.UpStatus);
SongAdminRoute.post("/delete", SongAdminController_1.default.DeleteSong);
exports.default = SongAdminRoute;
