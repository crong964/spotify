import { Request, Response } from "express"
import likedSongService, { LikedSongService } from "../services/LikedSongService"
import userService, { UserService } from "../services/UserService"

class SearchControll {
    static user: UserService = userService
    static likedSong: LikedSongService = likedSongService
    constructor() {

    }
    async SearchName(req: Request, res: Response) {
        var name = req.body.name
        
        
        var id = req.cookies.id
        var ls = await Promise.all([SearchControll.likedSong.SearchName(name, id), SearchControll.user.SearchName(name)])
        res.json({
            ls: ls[0],
            artise: ls[1]
        })
    }
}

var searchControll=new SearchControll()
export default searchControll