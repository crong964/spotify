"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArtistManagementController_1 = __importDefault(require("../controller/ArtistManagementController"));
const multer_1 = __importDefault(require("multer"));
const ArtistManagementRoute = (0, express_1.Router)();
const memory = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: memory })
    .fields([{ name: "Banner", maxCount: 1 }, { name: "pathImage", maxCount: 1 }]);
ArtistManagementRoute.post("/add", upload, ArtistManagementController_1.default.Add);
ArtistManagementRoute.post("/addQickly", ArtistManagementController_1.default.AddQickly);
ArtistManagementRoute.post("/", ArtistManagementController_1.default.GetAll);
ArtistManagementRoute.post("/getWithout", ArtistManagementController_1.default.GetWithout);
ArtistManagementRoute.post("/Get", ArtistManagementController_1.default.Get);
ArtistManagementRoute.post("/VertifyArtist", ArtistManagementController_1.default.VertifyArtist);
ArtistManagementRoute.post("/update", upload, ArtistManagementController_1.default.Update);
exports.default = ArtistManagementRoute;
