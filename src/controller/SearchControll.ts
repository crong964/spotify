import { Request, Response } from "express"
import LikedSongModel from "../model/LikedSongModel"
import { userService, likedSongService, haveListFriendsService, playListService, songService } from "../services"


class SearchControll {
    static user = userService
    static likedSong = likedSongService
    static haveListFriends = haveListFriendsService
    static playlist = playListService
    static song = songService
    constructor() {

    }
    async SearchSongNameWithoutPlaylist(req: Request, res: Response) {
        var name = req.body.name
        var idPlaylist = req.body.idPlaylist
        var status = req.body.status
        let ls = await SearchControll.song.SearchSongNameWithoutPlaylist(name, idPlaylist, status)
        res.json({
            songs: ls
        })

    }
    async SearchNameArtistAndSong(req: Request, res: Response) {
        var name = req.body.name
        var id = req.cookies.id
        var ls = await Promise.all([SearchControll.likedSong.SearchName(name, id),
        SearchControll.user.SearchNameArtist(name),
        SearchControll.playlist.SearchPlaylistName(name)
        ])
        var songls: LikedSongModel[] = []
        if (ls[1].length > 0) {
            var liked = new LikedSongModel()
            liked.id_user_liked = req.cookies.id
            liked.user_id = ls[1][0].id
            songls = await SearchControll.likedSong.GetAllByIduserAndIdArtise(liked)
        }
        res.json({
            ls: ls[0],
            artise: ls[1],
            songls: songls,
            playlists: ls[2]
        })
    }
    async SearchName(req: Request, res: Response) {
        var name = req.body.name
        if (name.length <= 0) {
            res.json({
                err: false,
                friend: [],
                orther: []
            })
            return
        }
        var id = req.cookies.id
        var ls = await
            Promise.all([SearchControll.haveListFriends.SearchName(name, id, "2"),
            SearchControll.haveListFriends.SearchOther(name, id)])
        res.json({
            err: false,
            friend: ls[0],
            orther: ls[1]
        })
    }
    async SearchNameArtist(req: Request, res: Response) {
        var name = req.body.name
        if (!name || name.length <= 0) {
            res.json({
                err: false,
                ls: []
            })
            return
        }
        var ls = await SearchControll.user.SearchNameArtist(name)
        res.json({
            err: false,
            ls: ls
        })
    }
}

var searchControll = new SearchControll()
export default searchControll