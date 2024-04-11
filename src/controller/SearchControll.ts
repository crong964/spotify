import { Request, Response } from "express"
import likedSongService, { LikedSongService } from "../services/LikedSongService"
import userService, { UserService } from "../services/UserService"
import LikedSongModel from "../model/LikedSongModel"

class SearchControll {
    static user: UserService = userService
    static likedSong: LikedSongService = likedSongService
    constructor() {

    }
    async SearchNameArtist(req: Request, res: Response) {
        var name = req.body.name
        var id = req.cookies.id
        var ls = await Promise.all([SearchControll.likedSong.SearchName(name, id), SearchControll.user.SearchNameArtist(name)])
        var songls: LikedSongModel[] = []
        if (ls[1].length > 0) {
            var liked = new LikedSongModel()
            liked.id_user_liked = req.cookies.id
            liked.user_id = ls[1][0].id
            songls = await SearchControll.likedSong.GetAll(liked)
        }
        res.json({
            ls: ls[0],
            artise: ls[1],
            songls: songls
        })
    }
    async SearchName(req: Request, res: Response) {
        var name = req.body.name
        var id = req.cookies.id
        var ls = await SearchControll.user.SearchName(name, id)

        res.json({
            err: false,
            ls: ls,
        })
    }
}

var searchControll = new SearchControll()
export default searchControll