"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlayListLikeController_1 = __importDefault(require("../controller/PlayListLikeController"));
const PlayListLikeRoute = (0, express_1.Router)();
PlayListLikeRoute.post("/add", PlayListLikeController_1.default.Add);
PlayListLikeRoute.post("/delete", PlayListLikeController_1.default.Delete);
PlayListLikeRoute.post("/getall", PlayListLikeController_1.default.GetAll);
exports.default = PlayListLikeRoute;
