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
exports.HaveListFriendsService = void 0;
const HaveListFriendsDatabase_1 = __importDefault(require("../database/HaveListFriendsDatabase"));
const HaveListFriendsModel_1 = __importDefault(require("../model/HaveListFriendsModel"));
class HaveListFriendsService {
    constructor(i) {
        this.data = i;
    }
    InsertListFriends(idUser, idFriend, IsFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = {
                "Request": "0",
                "Responsd": "1",
                "Friend": "2"
            };
            var check = yield this.data.InsertListFriends(idUser, idFriend, d[IsFriend]);
            return check;
        });
    }
    Setls(ls) {
        if (ls == undefined) {
            return [];
        }
        var lts = [];
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new HaveListFriendsModel_1.default();
            temp.setAll(element);
            lts.push(temp);
        }
        return lts;
    }
    Get(idUser, idAddFriends) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.Get(idUser, idAddFriends);
            return this.Setls(check)[0];
        });
    }
    GetAllTypeFriend(idUser, IsFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = {
                "Request": "0",
                "Responsd": "1",
                "Friend": "2"
            };
            var check = yield this.data.GetAllTypeFriend(idUser, d[IsFriend]);
            return check;
        });
    }
    CancelFriends(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.CancelFriends(idUser, idFriend);
            return check;
        });
    }
    AcceptRequset(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.UpDateType(idUser, idFriend, "2");
            return check;
        });
    }
    SearchName(name, iduse, type) {
        return __awaiter(this, void 0, void 0, function* () {
            type = type || "";
            var check = yield this.data.SearchName(name, iduse, type);
            return this.Setls(check);
        });
    }
    SearchOther(name, iduse) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.data.SearchOther(name, iduse);
            return this.Setls(check);
        });
    }
}
exports.HaveListFriendsService = HaveListFriendsService;
var haveListFriendsService = new HaveListFriendsService(new HaveListFriendsDatabase_1.default());
exports.default = haveListFriendsService;
