"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const ProcessVideo_1 = __importDefault(require("../config/ProcessVideo"));
const fs_1 = __importStar(require("fs"));
const GoogleDrive_1 = __importDefault(require("../config/GoogleDrive"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (0, path_1.join)(process.cwd(), "/public/music"));
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const teststreaming = (0, express_1.Router)();
teststreaming.get("/", (req, res) => {
    res.sendFile((0, path_1.join)(process.cwd(), "web", "test.html"));
});
teststreaming.post("/", upload.single("streaming"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let s = yield ProcessVideo_1.default.FileType(((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "");
    let { filename } = req.file;
    let f = false;
    let input = (0, path_1.join)(process.cwd(), "public", "music", filename);
    if (s.data.indexOf("mp3") >= 0) {
        f = yield ProcessVideo_1.default.ConvertMp3ToMp4(input, (0, path_1.join)(process.cwd(), "public", "music", "mp4", filename));
        (0, fs_1.unlinkSync)(input);
        s.data = "mp3";
    }
    if (s.data.indexOf("mp4") >= 0) {
        fs_1.default.cpSync(input, (0, path_1.join)(process.cwd(), "public", "music", "mp4", filename));
        (0, fs_1.unlinkSync)(input);
        f = true;
        s.data = "mp4";
    }
    let baseinput = (0, path_1.join)(process.cwd(), "public", "music", "mp4", filename);
    let fragmentoutput = (0, path_1.join)(process.cwd(), "public", "music", "Fragment", filename);
    let fram = yield ProcessVideo_1.default.Mp4Fragment(baseinput, fragmentoutput);
    if (!fram.err) {
        (0, fs_1.unlinkSync)(baseinput);
    }
    let slipinput = (0, path_1.join)(process.cwd(), "public", "music", filename);
    fs_1.default.mkdirSync(slipinput);
    let slip = yield ProcessVideo_1.default.Mp4Split(fragmentoutput, (0, path_1.join)(slipinput, filename));
    if (!slip.err) {
        (0, fs_1.unlinkSync)(fragmentoutput);
    }
    let d = yield GoogleDrive_1.default.CreateFoder(filename);
    if (d.err || !d.id) {
        res.redirect("/teststreaming?err=lỗi");
        console.log(d.err);
        return;
    }
    let idparent = d.id;
    let ids = [];
    let files = fs_1.default.readdirSync(slipinput);
    let pathslip = "";
    let j = 0;
    do {
        j += 3;
        let y = files.filter((v, i) => {
            return j > i && i >= j - 3;
        }).map((v, i) => __awaiter(void 0, void 0, void 0, function* () {
            i = j - 3 + i;
            if (i == 0) {
                pathslip = (0, path_1.join)(slipinput, `${filename}.init`);
            }
            else {
                if (s.data === "mp3") {
                    pathslip = (0, path_1.join)(slipinput, `${filename}-1.${i}.m4s`);
                }
                else {
                    pathslip = (0, path_1.join)(slipinput, `${filename}-2.${i}.m4s`);
                }
            }
            let id = yield GoogleDrive_1.default.UploadStream(pathslip, `${filename}_${i}`, idparent);
            return id;
        }));
        let idtemp = yield Promise.all(y);
        ids.push(...idtemp);
        console.log(`${j}/${files.length}`);
    } while (j < files.length);
    pathslip = `${filename}_init.txt`;
    GoogleDrive_1.default.CreateTxt(pathslip, idparent, JSON.stringify(ids));
    res.redirect("/teststreaming");
    fs_1.default.rmSync(slipinput, { recursive: true, force: true });
}));
teststreaming.get("/folder", upload.single("streaming"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let { name } = req.query
    // let ls = await googleDrive.SearchNameFolder(name as string || "")
    // googleDrive.Trashed(ls[0])
    res.redirect("/teststreaming");
}));
exports.default = teststreaming;
