import { Request, Response } from "express";
import { recentSongService } from "../services";


class RecentSongController {
    static recentSong = recentSongService
    constructor() {

    }
    async ListenAgainByUserId(req: Request, res: Response) {
        var id = req.cookies.id
        var ls = await RecentSongController.recentSong.Count(id)
        res.json({
            err: false,
            count: ls
        })
    }
    async GetListenAgainById(req: Request, res: Response) {
        var id = req.cookies.id
        let start = req.params.id || 0
       
        
        var ls = await RecentSongController.recentSong.ListenAgainByUserId(id, parseInt(start + "") * 50)
        res.json({
            err: false,
            ls: ls
        })
    }
    async GetAllByidUser(req: Request, res: Response) {
        var id = req.cookies.id
        var ls = await RecentSongController.recentSong.GetAllByidUser(id)
        res.json({
            err: false,
            ls: ls
        })
    }

}

var recentSongController = new RecentSongController()


export default recentSongController