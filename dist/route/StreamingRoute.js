"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StreamingController_1 = __importDefault(require("../controller/StreamingController"));
const StreamingRoute = (0, express_1.Router)();
StreamingRoute.get("/idSong", StreamingController_1.default.StreamingMusic);
StreamingRoute.get("/s", StreamingController_1.default.StreamingMusicUpload);
exports.default = StreamingRoute;
