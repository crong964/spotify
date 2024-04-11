"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessController_1 = __importDefault(require("../controller/MessController"));
const MessRoute = (0, express_1.Router)();
MessRoute.post("/GetAllMessInbox", MessController_1.default.GetAllMessInbox);
MessRoute.post("/send", MessController_1.default.SendMess);
MessRoute.post("/hiddenMess", MessController_1.default.HiddenMess);
MessRoute.post("/remove", MessController_1.default.Remove);
exports.default = MessRoute;
