import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
export default function ADMIN(req: Request, res: Response, next: NextFunction) {
    var apikey = req.headers.apikey as string || req.cookies.apikey
    if (!apikey) {
        res.status(403).send({
            mess: "ko có quyền "
        })
        return
    }
    var decode = jwt.verify(apikey, "1") as jwt.JwtPayload
    if (decode.role == "master") {
        next()
        return
    }
    res.status(403).send({
        mess: "ko có quyền "
    })

}