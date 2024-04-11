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
exports.BoxService = void 0;
const BoxDatabase_1 = __importDefault(require("../database/BoxDatabase"));
const BoxModel_1 = __importDefault(require("../model/BoxModel"));
class BoxService {
    constructor(i) {
        this.data = i;
    }
    getAllBoxByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = yield this.data.getAllBoxById(idUser);
            return this.setlsBox(ls);
        });
    }
    insertNewBox(idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.insertNewBox(idBox, type);
            return check;
        });
    }
    setlsBox(any) {
        var list = [];
        if (any == undefined) {
            return [];
        }
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            var box = new BoxModel_1.default();
            box.setAll(element);
            list.push(box);
        }
        return list;
    }
    UpdateBoxType(idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.UpdateBoxType(idBox, type);
            return check;
        });
    }
    UpdateLastMessBox(idUser, content, idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            check = yield this.data.UpdateLastMessBox(idUser, content, idBox, type);
            return check;
        });
    }
    GetBoxbyIdBox(idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var box;
            try {
                var ls = yield this.data.GetBoxbyIdBox(idBox);
                for (let i = 0; i < ls.length; i++) {
                    const element = ls[i];
                    box = new BoxModel_1.default();
                    box.setAll(element);
                    break;
                }
            }
            catch (error) {
                console.log(error);
            }
            return box;
        });
    }
}
exports.BoxService = BoxService;
var boxService = new BoxService(new BoxDatabase_1.default());
exports.default = boxService;
