"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RecentPlaylistController_1 = __importDefault(require("../controller/RecentPlaylistController"));
const RecentPlaylistRoute = (0, express_1.Router)();
RecentPlaylistRoute.post("/play", RecentPlaylistController_1.default.Play);
RecentPlaylistRoute.post("/getAll", RecentPlaylistController_1.default.GetAllByIdUser);
exports.default = RecentPlaylistRoute;
