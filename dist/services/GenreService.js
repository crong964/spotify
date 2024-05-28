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
exports.GenreService = void 0;
const Config_1 = __importDefault(require("../config/Config"));
const GenreModel_1 = __importDefault(require("../model/GenreModel"));
const uuid_1 = require("uuid");
class GenreService {
    constructor() {
    }
    Add(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            if (genre.Floor == 0) {
                var num = yield this.GetMaxRight();
                genre.LeftGenre = num + 1;
                genre.RightGenre = num + 2;
                genre.idParent = "0";
                genre.Id = (0, uuid_1.v4)();
                genre.Floor = 0;
            }
            else {
                var temp = yield this.Get(genre.idParent);
                if (!temp) {
                    return undefined;
                }
                let check = yield this.CreateBlank(temp.RightGenre);
                if (!check) {
                    return undefined;
                }
                genre.LeftGenre = temp.RightGenre;
                genre.RightGenre = temp.RightGenre + 1;
                genre.idParent = temp.Id;
                genre.Id = (0, uuid_1.v4)();
                genre.Floor = temp.Floor + 1;
            }
            var sql = " INSERT INTO genre(Id, Name, RightGenre, LeftGenre,idParent,Floor) VALUES (?,?,?,?,?,?)";
            var check;
            check = yield Config_1.default.query(sql, [genre.Id, genre.Name, genre.RightGenre, genre.LeftGenre, genre.idParent, genre.Floor]);
            return check;
        });
    }
    Get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check, l;
            var sql = "SELECT * FROM genre WHERE Id=? ";
            var check;
            l = (yield Config_1.default.query(sql, [id]));
            if (l && l.length > 0) {
                check = new GenreModel_1.default();
                check.setAll(l[0]);
            }
            return check;
        });
    }
    GetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre ORDER BY Floor ASC ";
            var check;
            check = yield Config_1.default.query(sql, []);
            return this.Setls(check);
        });
    }
    GetAllLeftAndRight(Left, Right) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre where LeftGenre > ? AND RightGenre < ?";
            var check;
            check = yield Config_1.default.query(sql, [Left, Right]);
            return this.Setls(check);
        });
    }
    GetGenreByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var check, l;
            var sql = "SELECT * FROM genre where Name LIKE ?";
            var check;
            l = (yield Config_1.default.query(sql, [`%${name}%`]));
            if (l && l.length > 0) {
                check = new GenreModel_1.default();
                check.setAll(l[0]);
            }
            return check;
        });
    }
    GetAllByidParent(idParent) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre where idParent = ?";
            var check;
            check = yield Config_1.default.query(sql, [idParent]);
            return this.Setls(check);
        });
    }
    GetMaxRight() {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT MAX(RightGenre) as max FROM genre ";
            var l = yield Config_1.default.query(sql, []);
            var check = -1;
            if (l && l[0]["max"]) {
                check = l[0]["max"];
            }
            return check;
        });
    }
    CreateBlank(Right) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE genre SET RightGenre = RightGenre + 2 WHERE RightGenre >= ? ";
            var sql2 = "UPDATE genre SET LeftGenre = LeftGenre + 2 WHERE LeftGenre > ?";
            var check = yield Promise.all([Config_1.default.query(sql, [Right]), Config_1.default.query(sql2, [Right])]);
            return check;
        });
    }
    UpdateName(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "UPDATE genre SET Name = ? WHERE Id =? ";
            var check = yield Config_1.default.query(sql, [name, id]);
            return check;
        });
    }
    DeleteBlank(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var genre = yield this.Get(id);
            if (!genre) {
                return undefined;
            }
            var check;
            if (genre.RightGenre - genre.LeftGenre !== 1) {
                return undefined;
            }
            var sql = "UPDATE genre SET RightGenre = RightGenre - 2 WHERE RightGenre > ? ";
            var sql2 = "UPDATE genre SET LeftGenre = LeftGenre - 2 WHERE LeftGenre > ?";
            check = yield Promise.all([Config_1.default.query(sql, [genre.RightGenre + ""]), Config_1.default.query(sql2, [genre.RightGenre + ""])]);
            return check;
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.DeleteBlank(id);
            if (check == undefined) {
                return undefined;
            }
            var sql = "DELETE FROM genre WHERE id = ?";
            var check1 = yield Config_1.default.query(sql, [id]);
            return check1;
        });
    }
    GetIdParentByIdplaylist(IdPlaylist) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = ` SELECT g2.* FROM genre g1,playlist pl, genre g2
        WHERE pl.Genre_ID=g1.Id AND pl.id= ? AND g1.LeftGenre >= g2.LeftGenre AND g2.RightGenre >= g1.RightGenre`;
            var check = yield Config_1.default.query(sql, [IdPlaylist]);
            return this.Setls(check);
        });
    }
    GetAllByLimitFloor(floor) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM genre where Floor < ? ORDER BY Floor ASC ";
            var check;
            check = yield Config_1.default.query(sql, [floor]);
            return this.Setls(check);
        });
    }
    GetChildrenByIdParent(idParent) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT g2.* FROM genre g1,genre g2 WHERE g1.id =? AND g1.RightGenre > g2.RightGenre AND g1.LeftGenre < g2.LeftGenre ";
            var check;
            check = yield Config_1.default.query(sql, [idParent]);
            return this.Setls(check);
        });
    }
    Setls(ls) {
        if (ls == undefined) {
            return [];
        }
        var list = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var genre = new GenreModel_1.default();
            genre.setAll(element);
            list.push(genre);
        }
        return list;
    }
}
exports.GenreService = GenreService;
var genreService = new GenreService();
exports.default = genreService;
