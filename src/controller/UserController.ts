import { join } from "path";
import UserModel from "../model/UserModel";
import userService, { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { unlink } from "fs/promises";
import haveListFriendsService, { HaveListFriendsService } from "../services/HaveListFriendsService";
class UserController {
    static user: UserService = userService
    static HaveListFriends: HaveListFriendsService = haveListFriendsService
    constructor() {


    }
    async SignIn(req: Request, res: Response) {
        var account = req.query.account as string
        if (!account) {

        }
        var check = await UserController.user.GetByAccount(account)
        res.cookie("id", check?.id, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true })
        res.redirect("http://localhost:8000/dashboard")
    }
    async Get(req: Request, res: Response) {
        var id = req.cookies.id
        var use = await UserController.user.Get(id)

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
        var ls = await UserController.user.getAllArtist("1")
        res.json({
            err: false,
            ls: ls
        })
    }
    async getArtisePage(req: Request, res: Response) {
        var idartise = req.params.artisepage
        var id = req.cookies.id
        if (id == idartise) {
            var ls = await UserController.user.Get(idartise)
            res.json({
                ls: ls,
                isfriend: undefined
            })
            return
        }
        var l = await Promise.all([UserController.user.Get(idartise),
        UserController.HaveListFriends.Get(id, idartise)])


        res.json({
            err: false,
            ls: l[0],
            isfriend: l[1] ? l[1].IsFriend : "-1"
        })
    }
    async update(req: Request, res: Response) {
        var d = new UserModel()
        var olduer = await UserController.user.Get(req.cookies.id)
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
        var check = await UserController.user.Update(d)

        res.json({
            err: check == undefined
        })
    }


    async GetAllUserAdmin(req: Request, res: Response) {
        var Vertify = req.body.Vertify || ""
        var ls = await UserController.user.GetAllUserByType(Vertify)
        res.json({
            err: false,
            ls: ls
        })
    }
}
var userController = new UserController()

export default userController

