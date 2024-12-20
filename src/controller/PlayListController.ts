import { join } from "path";
import ContainModel from "../model/ContainModel";
import { PlayListModel } from "../model/PlayListModel";
import containService, { ContainService } from "../services/ContainService";

import playListService, { PlayListService } from "../services/PlayListService";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import genreService, { GenreService } from "../services/GenreService";
import { unlink } from "fs/promises";
import likedSongService, { LikedSongService } from "../services/LikedSongService";
import userService, { UserService } from "../services/UserService";
import haveListFriendsService, { HaveListFriendsService } from "../services/HaveListFriendsService";
import LikedSongModel from "../model/LikedSongModel";
import firebase from "../config/Firebase";
import playListLikeService from "../services/PlayListLikeService";

export class PlayListController {

    static playlist: PlayListService = playListService
    static contain: ContainService = containService
    static genre: GenreService = genreService
    static likedSong: LikedSongService = likedSongService
    static user: UserService = userService
    static HaveListFriends: HaveListFriendsService = haveListFriendsService
    static Playlistlike = playListLikeService

    async AddPlayListByAdmin(req: Request, res: Response) {
        let file = req.file?.filename as any as string

        let playlistmodel = new PlayListModel()
        playlistmodel.setAll(req.body)
        playlistmodel.id = `playlist-${uuidv4()}`
        playlistmodel.User_id = req.cookies.id
        playlistmodel.Type = "playlist"
        playlistmodel.Songs = req.body.ls.length
        if (req.file) {

            try {
                playlistmodel.ImagePath = await firebase.UploadImageBufferNoZip(`playlist/${playlistmodel.id}`, req.file.buffer) as string
            } catch (error) {
                console.log(error);

            }
        }


        let check = await playListService.Add(playlistmodel)

        let ls = req.body.ls as string[]

        let list = ls.map(async (Song_id) => {
            let temp = new ContainModel()
            temp.PlayList_id = playlistmodel.id
            temp.Song_id = Song_id
            return await PlayListController.contain.Add(temp)
        })

        let checkls = await Promise.all(list)
        res.json({
            err: false
        })
    }
    async GetByGenreAdmin(req: Request, res: Response) {
        let Genre_ID = req.body.Genre_ID
        let ls = await PlayListController.playlist.GetByGenre(Genre_ID, 0, 10)

        res.json({
            ls: ls, err: true
        })
    }
    async PlayListDetailAdmin(req: Request, res: Response) {
        let idplaylist = req.params.idplaylist
        let ls = await Promise.all([PlayListController.playlist.Get(idplaylist),
        PlayListController.contain.GetAllByPlayList(idplaylist), PlayListController.
            genre.GetIdParentByIdplaylist(idplaylist)])
        res.json({
            err: ls[0] == undefined,
            playlist: ls[0],
            songs: ls[1],
            genre: ls[2]
        })
    }
    async UpdatePlayListDetailAdmin(req: Request, res: Response) {
        let oldplaylist = await PlayListController.playlist.Get(req.body.id)
        if (!oldplaylist) {
            res.json({
                err: true
            })
            return
        }
        let playlistmodel = new PlayListModel()
        playlistmodel.setAll(req.body)

        if (req.file) {
            try {
                await firebase.MoveImage(`playlist/${playlistmodel.id}`, `deletePlaylist/playlist/${playlistmodel.id}`)
                playlistmodel.ImagePath = await firebase.UploadImageBufferNoZip(`playlist/${playlistmodel.id}`, req.file.buffer) as string
            } catch (error) {
                console.log(error);
            }
        }
        playlistmodel.id = oldplaylist.id
        playlistmodel.User_id = req.cookies.id
        playlistmodel.Type = "playlist"
        if (req.body.ls) {
            playlistmodel.Songs = req.body.ls.length + oldplaylist.Songs
            let ls = req.body.ls as string[]
            let list = ls.map(async (Song_id) => {
                let temp = new ContainModel()
                temp.PlayList_id = playlistmodel.id
                temp.Song_id = Song_id
                return await PlayListController.contain.Add(temp)
            })

            let checkls = await Promise.all(list)
        }
        let check = await playListService.Update(playlistmodel)
        res.json({
            err: check == undefined
        })
    }
    async GetPlayListById(req: Request, res: Response) {
        let id_playlist = req.params.idplaylist

        let id = req.cookies.id
        let ls = await Promise.all([PlayListController.playlist.Get(id_playlist),
        PlayListController.likedSong.GetAllByIdPlayList(id, id_playlist),
        PlayListController.Playlistlike.Get(id, id_playlist)])

        res.json({
            playlist: ls[0],
            songs: ls[1],
            like: ls[2] != undefined,
            err: ls[0] == undefined
        })
    }
    async NextPlayListLimit(req: Request, res: Response) {
        let start = req.body.start || 0
        let count = req.body.count || 10
        let ls = await PlayListController.playlist.GetPlayListLimit(start, count)
        res.json({
            err: false,
            ls: ls
        })
    }
    async NextPlayArtistListLimit(req: Request, res: Response) {

        let count = req.body.count || 10
        let start = req.body.start * count || 0


        let ls = await Promise.all([PlayListController.playlist.GetPlayListArtistLimit(start, count),
        PlayListController.playlist.CountPlayListArtist()])

        res.json({
            err: false,
            ls: ls[0],
            count: ls[1].count
        })
    }

}

let playListController: PlayListController = new PlayListController()

export default playListController