import LikedSongModel from "../model/LikedSongModel";
import RecentPlaylistModel from "../model/RecentPlaylistModel";
import SongModel from "../model/SongModel";
import likedSongService, { LikedSongService } from "../services/LikedSongService";
import PlayListLikeService from "../services/PlayListLikeService";
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
    static likePlaylist = PlayListLikeService
    static r: RecentPlaylistService = recentPlaylistService
    constructor() {

    }
    async Play(req: Request, res: Response) {

        var User_ID = req.cookies.id
        var d = new RecentPlaylistModel()

        d.User_ID = User_ID
        d.ID = req.body.id
        d.Type = req.body.type

        var ls: SongModel[] = []
        let s = await RecentPlaylistController.playlist.Get(d.ID)
        if (s != undefined) {
            ls = await RecentPlaylistController.likesong.GetAllByIdPlayList(d.User_ID, s.id)
            RecentPlaylistController.likePlaylist.UpdateDate(User_ID, d.ID)
        }
        var check = await RecentPlaylistController.r.Get8FirstRecentPlaylist(d.User_ID, d.ID)


        var check1 = undefined
        if (check == undefined) {
            RecentPlaylistController.r.Add(d)
        }

        res.json({
            err: false,
            ls: ls
        })

    }
    async GetAllByIdUser(req: Request, res: Response) {
        var ls = await RecentPlaylistController.r.GetByUser(req.cookies.id, 0, 8)
        res.json({
            err: false,
            ls: ls
        })
    }
}

const recentPlaylistController = new RecentPlaylistController()

export default recentPlaylistController