import { join } from "path";
import UserModel from "../model/UserModel";
import userService, { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { unlink } from "fs/promises";
class UserController {
    static service: UserService = userService
    test: UserService
    g: string
    constructor(f: UserService) {
        this.test = f
        this.g = "g"

    }
    async SignIn(req: Request, res: Response) {
        var account = req.query.account as string
        if (!account) {

        }
        var check = await UserController.service.GetByAccount(account)
        res.cookie("id", check?.id, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true })
        res.redirect("http://localhost:8000/dashboard")
    }
    async Get(req: Request, res: Response) {
        var id = req.cookies.id
        var use = await UserController.service.Get(id)

        if (use) {
            use.Account = ""
            res.json({
                err: false,
                u: use
            })
            return
        }
        res.json({
            err: false,
            u: use
        })
    }
    async getAllArtist(req: Request, res: Response) {
        var ls = await UserController.service.getAllArtist("1")
        res.json({
            err: false,
            ls: ls
        })
    }
    async getArtisePage(req: Request, res: Response) {

        var ls = await UserController.service.Get(req.params.artisepage)
        res.json({
            err: false,
            ls: ls
        })
    }
    async update(req: Request, res: Response) {
        var d = new UserModel()
        var olduer = await UserController.service.Get(req.cookies.id)
        if (!olduer) {
            res.json({
                err: true
            })
            return
        }
        d.setAll(olduer)
        d.setAll(req.body)
        if (req.file) {
            d.pathImage = join("/public/avatar", req.file.filename)
            try {

                await unlink(join(process.cwd(), olduer.pathImage))
            } catch (error) {
                console.log(error);

            }
        }
        var check = await UserController.service.Update(d)

        res.json({
            err: check == undefined
        })
    }
}


export default new UserController(userService)

