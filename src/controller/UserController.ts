import { join } from "path";
import UserModel from "../model/UserModel";
import userService, { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { unlink } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import haveListFriendsService, { HaveListFriendsService } from "../services/HaveListFriendsService";
import playListService, { PlayListService } from "../services/PlayListService";
import likedSongService, { LikedSongService } from "../services/LikedSongService";
import LikedSongModel from "../model/LikedSongModel";
import accountService from "../services/AccountService";
import AccountModel from "../model/AccountModel";

class UserController {
    static user: UserService = userService
    static account = accountService
    static HaveListFriends: HaveListFriendsService = haveListFriendsService
    static likedSong: LikedSongService = likedSongService
    static playlist: PlayListService = playListService
    constructor() {


    }
    async SignIn(req: Request, res: Response) {
        var account = req.query.account as string
        if (!account) {

        }
        var check = await UserController.account.GetAccount(account)
        res.cookie("id", check?.id, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true })
        res.redirect("http://localhost:8000/dashboard")
    }
    async Get(req: Request, res: Response) {
        var id = req.cookies.id
        var use = await UserController.user.Get(id)

        if (use) {

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

        var idArtist = req.params.artistpage
        var id = req.cookies.id
        var playlist = await UserController.playlist.Get(idArtist)
        if (playlist == undefined) {
            res.json({
                err: true,
                mess: "ko có danh sách phát này"
            })
            return
        }
        var temp = new LikedSongModel()
        temp.user_id = playlist.User_id
        temp.id_user_liked = id
        var l = await Promise.all([UserController.user.Get(playlist.User_id),
        UserController.HaveListFriends.Get(id, playlist.User_id),
        UserController.likedSong.GetAllByIduserAndIdArtise(temp)],
        )


        res.json({
            err: false,
            atist: l[0],
            isfriend: l[1] ? l[1].IsFriend : "-1",
            lsong: l[2]
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
    async GetAllEAdmin(req: Request, res: Response) {
        var role = req.body.role || "employee"
        var ls = await UserController.user.GetAllEAdmin(role)
        res.json({
            err: false,
            ls: ls
        })
    }
    async AddEAdmin(req: Request, res: Response) {
        var user = new UserModel()
        var account = new AccountModel()
        account.setAll(req.body)
        user.setAll(req.body)
        var check = await UserController.account.GetAccount(account.Account)
        if (check) {
            res.json({
                err: true,
                mess: "đã tồn tại"
            })
            return
        }
        user.id = `user-${uuidv4()}`

        var add = await UserController.user.AddAccount(user)
        if (!add) {
            res.json({
                err: true,
                mess: "không thêm dc user"
            })
            return
        }
        add = await UserController.account.Add(user.id, account.Account, account.Password)
        res.json({
            err: add == undefined,
        })
    }
    async DeleteEAdmin(req: Request, res: Response) {
        var id = req.body.id
        var de = await UserController.user.DeleteEAdmin(id)
        res.json({
            err: de == undefined
        })
    }
    async GetEditUser(req: Request, res: Response) {
        var id = req.params.id
        var de = await UserController.user.Get(id)
        res.json({
            err: de == undefined,
            data: de
        })
    }
    async PostEditUser(req: Request, res: Response) {
        var user = new UserModel()
        user.setAll(req.body)
        var de = await UserController.user.UpdateE(user)
        res.json({
            err: de == undefined,
        })
    }

}
var userController = new UserController()

export default userController

