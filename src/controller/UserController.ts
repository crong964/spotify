import { join } from "path";
import UserModel from "../model/UserModel";
import userService, { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { unlink } from "fs/promises";
import haveListFriendsService, { HaveListFriendsService } from "../services/HaveListFriendsService";
class UserController {
    static service: UserService = userService
    static HaveListFriends: HaveListFriendsService = haveListFriendsService
    constructor() {


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
            err: true,
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
        var idartise = req.params.artisepage
        var id = req.cookies.id
        var l = await Promise.all([UserController.service.Get(idartise),
        UserController.HaveListFriends.Get(id, idartise)])
        
        res.json({
            err: false,
            ls: l[0],
            isfriend: l[1] ? l[1].IsFriend : "-1"
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


export default new UserController()

