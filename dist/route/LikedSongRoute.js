"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LikedSongController_1 = __importDefault(require("../controller/LikedSongController"));
const LikedSongRoute = (0, express_1.Router)();
LikedSongRoute.get("/getall/:idartise", LikedSongController_1.default.GetAll);
LikedSongRoute.post("/add", LikedSongController_1.default.Add);
LikedSongRoute.post("/delete", LikedSongController_1.default.Delete);
LikedSongRoute.get("/likedsongs", LikedSongController_1.default.GetAllLikedSong);
exports.default = LikedSongRoute;
