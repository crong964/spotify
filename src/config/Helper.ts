import jwt from "jsonwebtoken"
import "dotenv/config"
import { OAuth2Client, TokenPayload } from "google-auth-library";
const SECRET = process.env.SECRET;
const client_id_gg = process.env.Client_ID_GG
export interface limit {
    start: number
    end: number
}

export function VertifyJWT(apikey: string, secret?: string) {
    var decode: jwt.JwtPayload | undefined = undefined
    try {
        decode = jwt.verify(apikey, secret || SECRET || "1", {}) as jwt.JwtPayload
    } catch (error) {

    }
    return decode
}

export function SignJWT(payload: string, secret?: string) {
    return jwt.sign(payload, SECRET || "1")
}

export function IdUser(p: Request) {

}
export async function VerifyGoogleIDtoken(token: string) {
    const client = new OAuth2Client();
    let payload: TokenPayload | undefined
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: client_id_gg,
        });
        const data = ticket.getPayload();
        payload = data
    } catch (error) {
        console.log(error);
    }
    return payload
}