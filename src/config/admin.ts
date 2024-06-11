import { Response, Request, NextFunction } from "express";
import "dotenv/config"
import { VertifyJWT } from "./Helper";
const SECRET = process.env.SECRET;
export default function ADMIN(req: Request, res: Response, next: NextFunction) {
    var apikey = req.headers.apikey as string || req.cookies.apikey
    if (!apikey) {
        res.redirect("/auth")
        return
    }
    var decode = VertifyJWT(apikey)
    if (decode == undefined) {
        res.redirect("/auth")
        return
    }
    if (decode.role == "master") {
        next()
        return
    }
    res.redirect("/auth")
}
export function USER(req: Request, res: Response, next: NextFunction) {
    var apikey = req.headers.apikey as string || req.cookies.apikey
    if (!apikey || !VertifyJWT(apikey)) {
        res.json({ err: true })
        return
    }
    var decode = VertifyJWT(apikey)
    if (!decode || !decode.id ) {
        res.json({ err: true })
        return
    }
    next()
}