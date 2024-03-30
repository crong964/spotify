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
const Config_1 = __importDefault(require("../config/Config"));
class SongDatabase {
    Add(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = " INSERT INTO song(Id, user_id, genre_id, Singer, Duration, PublicDate,imagePath,filePath) VALUES(?, ?, ?, ?, ?, ?,?,?)";
            var check;
            check = yield Config_1.default.query(sql, [d.Id, d.user_id, d.Genre_id, d.Singer, d.Duration, d.publicDate, d.imagePath, d.filePath]);
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = " SELECT * FROM song WHERE Id=?";
            var check;
            check = yield Config_1.default.query(sql, [id]);
            return check;
        });
    }
    GetAll(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = " SELECT * FROM song WHERE user_id = ?";
            var check;
            check = yield Config_1.default.query(sql, [user_id]);
            return check;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "DELETE FROM `song` WHERE Id=?";
            var check;
            check = yield Config_1.default.query(sql, [id]);
            return check;
        });
    }
    Update(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `UPDATE song Set genre_id =?, SongName=?, Duration=?, publicDate=?, description=?,imagePath=?,filePath=?, Singer=?
        WHERE Id =?`;
            var check;
            check = yield Config_1.default.query(sql, [d.Genre_id, d.SongName, d.Duration, d.publicDate, d.description, d.imagePath, d.filePath, d.Singer, d.Id]);
            return check;
        });
    }
    UpStatus(d) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = `UPDATE song Set status=?
        WHERE Id =?`;
            var check;
            check = yield Config_1.default.query(sql, [d.status, d.Id]);
            return check;
        });
    }
    GetValidateAll(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = " SELECT * FROM song WHERE user_id = ? AND status = 1";
            var check;
            check = yield Config_1.default.query(sql, [user_id]);
            return check;
        });
    }
}
exports.default = SongDatabase;
