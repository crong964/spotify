"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CmdController_1 = __importDefault(require("../controller/CmdController"));
const CmdRoute = (0, express_1.Router)();
CmdRoute.post("/", CmdController_1.default.PostCommand);
exports.default = CmdRoute;
