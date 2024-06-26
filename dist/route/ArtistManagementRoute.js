"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArtistManagementController_1 = __importDefault(require("../controller/ArtistManagementController"));
const ArtistManagementRoute = (0, express_1.Router)();
ArtistManagementRoute.post("/add", ArtistManagementController_1.default.Add);
