"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GenreController_1 = __importDefault(require("../controller/GenreController"));
const path_1 = require("path");
const GenreRoute = (0, express_1.default)();
GenreRoute.get("/", (req, res) => {
    res.sendFile((0, path_1.join)(process.cwd(), "web/admin.html"));
});
GenreRoute.get("/GetAll", GenreController_1.default.GetAll);
GenreRoute.post("/Add", GenreController_1.default.Add);
GenreRoute.post("/UpdateName", GenreController_1.default.UpdateName);
GenreRoute.post("/Delete", GenreController_1.default.Delete);
exports.default = GenreRoute;
