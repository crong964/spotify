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
exports.VerifyGoogleIDtoken = exports.IdUser = exports.SignJWT = exports.VertifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const google_auth_library_1 = require("google-auth-library");
const SECRET = process.env.SECRET;
const client_id_gg = process.env.Client_ID_GG;
function VertifyJWT(apikey, secret) {
    var decode = undefined;
    try {
        decode = jsonwebtoken_1.default.verify(apikey, secret || SECRET || "1", {});
    }
    catch (error) {
    }
    return decode;
}
exports.VertifyJWT = VertifyJWT;
function SignJWT(payload, secret) {
    return jsonwebtoken_1.default.sign(payload, SECRET || "1");
}
exports.SignJWT = SignJWT;
function IdUser(p) {
}
exports.IdUser = IdUser;
function VerifyGoogleIDtoken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new google_auth_library_1.OAuth2Client();
        let payload;
        try {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: client_id_gg,
            });
            const data = ticket.getPayload();
            payload = data;
        }
        catch (error) {
            console.log(error);
        }
        return payload;
    });
}
exports.VerifyGoogleIDtoken = VerifyGoogleIDtoken;
