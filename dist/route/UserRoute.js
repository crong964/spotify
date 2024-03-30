"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const UserRoute = (0, express_1.Router)();
UserRoute.get("/signin", UserController_1.default.SignIn);
UserRoute.get("/", UserController_1.default.Get);
UserRoute.get("/artist", UserController_1.default.getAllArtist);
UserRoute.get("/artisepage/:artisepage", UserController_1.default.getArtisePage);
exports.default = UserRoute;
