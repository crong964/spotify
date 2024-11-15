"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
require("dotenv/config");
const production = process.env.MODE == "production";
const mp4fragment = production ? (0, path_1.join)(process.cwd(), "/dist/tool/mp4fragment") : (0, path_1.join)(process.cwd(), "/src/tool/mp4fragment.exe");
const mp4split = production ? (0, path_1.join)(process.cwd(), "/dist/tool/mp4split") : (0, path_1.join)(process.cwd(), "/src/tool/mp4split.exe");
class ProcessVideo {
    constructor() {
    }
    Command(params) {
        return new Promise((tc, l) => {
            (0, child_process_1.exec)(params, (errs, sout, sin) => {
                tc({ err: errs != null, ok: (errs === null || errs === void 0 ? void 0 : errs.message) || "" });
            });
        });
    }
    Mp4Fragment(input, out) {
        return __awaiter(this, void 0, void 0, function* () {
            let s = yield this.Command(`${mp4fragment} --fragment-duration 5000 ${input} ${out}`);
            return s;
        });
    }
    Mp4Split(input, out) {
        return __awaiter(this, void 0, void 0, function* () {
            let s = yield this.Command(`${mp4split} --init-segment ${out}.init --audio --media-segment ${out}-%llu.%llu.m4s ${input}`);
            return s;
        });
    }
    FileType(path) {
        return new Promise((res, rej) => {
            (0, fluent_ffmpeg_1.default)(path).ffprobe((err, data) => {
                res({ err: err, data: data.format.format_name || "" });
            });
        });
    }
    ConvertMp3ToMp4(input, output) {
        return new Promise((res, rej) => {
            (0, fluent_ffmpeg_1.default)(input)
                .addOptions("-map", "0:0", "-c:a", "aac", "-c:v:0", "copy")
                .outputFormat("mp4")
                .saveToFile(output)
                .on('end', (stdout, stderr) => {
                res(true);
            })
                .on('error', (error) => {
                res(false);
                console.log(__filename, error);
            });
        });
    }
}
const processvideo = new ProcessVideo;
exports.default = processvideo;
