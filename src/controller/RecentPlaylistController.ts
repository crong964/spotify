import LikedSongModel from "../model/LikedSongModel";
import RecentPlaylistModel from "../model/RecentPlaylistModel";
import SongModel from "../model/SongModel";
import likedSongService, { LikedSongService } from "../services/LikedSongService";
import playListService, { PlayListService } from "../services/PlayListService";

import recentPlaylistService, { RecentPlaylistService } from "../services/RecentPlaylistService";
import songService, { SongService } from "../services/SongService";
import userService, { UserService } from "../services/UserService";
import { Request, Response } from "express";

class RecentPlaylistController {
    static user: UserService = userService
    static playlist: PlayListService = playListService
    static song: SongService = songService
    static likesong: LikedSongService = likedSongService
    static r: RecentPlaylistService = recentPlaylistService
    constructor() {

    }
    async Play(req: Request, res: Response) {

        var User_ID = req.cookies.id
        var d = new RecentPlaylistModel()

        d.User_ID = User_ID
        d.ID = req.body.id
        d.type = req.body.type

        var ls: SongModel[] = []
        switch (d.type) {
            case "playlist":
                let s = await RecentPlaylistController.playlist.Get(d.ID)
                if (s != undefined) {
                    d.image = s.ImagePath
                    d.name = s.PlayListName
                    ls = await RecentPlaylistController.likesong.GetAllByIdPlayList(d.User_ID, s.id)
                }
                break;
            case "artise":
                let s2 = await RecentPlaylistController.user.Get(d.ID)
                if (s2 != undefined) {
                    d.image = s2.pathImage
                    d.name = s2.ChanalName
                    var d2 = new LikedSongModel()
                    d2.user_id = d.ID
                    d2.id_user_liked = d.User_ID
                    ls = await RecentPlaylistController.likesong.GetAllByIduserAndIdArtise(d2)
                }
                break
        }


        var check = await recentPlaylistService.Get(d.User_ID, d.ID)


        var check1 = undefined
        if (check == undefined) {
            check1 = await recentPlaylistService.Add(d)
        }

        res.json({
            err: false,
            ls: ls
        })

    }
    async GetAllByIdUser(req: Request, res: Response) {
        var ls = await RecentPlaylistController.r.GetByUser(req.cookies.id, 0, 6)
        res.json({
            err: false,
            ls: ls
        })
    }
}

const recentPlaylistController = new RecentPlaylistController()

export default recentPlaylistController