import LikedSongDatabase from "../database/LikedSongDatabase";
import LikedSongModel from "../model/LikedSongModel";
import Mysql2 from "../config/Config";
export class LikedSongService {
    likedSongDatabase: LikedSongDatabase
    constructor(likedSongDatabase: LikedSongDatabase) {
        this.likedSongDatabase = likedSongDatabase
    }
    async Add(d: LikedSongModel) {
        var sql = "INSERT INTO `likedsong`(`Id`, `id_user_liked`) VALUES (?,?)";
        var check = await Mysql2.query(sql, [d.Id, d.id_user_liked]);
        return check;
    }
    async Delete(d: LikedSongModel) {
        var check = await this.likedSongDatabase.Delete(d)
        return check;
    }
    async GetAllByIduserAndIdArtise(d: LikedSongModel) {
        var sql = `SELECT song.Id, song.SongName,song.SongImage, song.Singer,song.Viewer,song.Duration,likedsong.liked 
        FROM song LEFT JOIN likedsong ON song.Id = likedsong.Id and likedsong.id_user_liked=? 
        WHERE song.user_id=? And song.status = 1;`

        var check = await Mysql2.query(sql, [d.id_user_liked, d.user_id]);

        return this.SetLs(check);
    }
    async Update(d: LikedSongModel) {
        var check = await this.likedSongDatabase.Update(d)
        return check;
    }
    async Get(d: LikedSongModel) {
        var check = await this.likedSongDatabase.Get(d)
        var ls = this.SetLs(check)
        return ls.length > 0 ? ls[0] : undefined;
    }
    async GetAllLikedSong(d: LikedSongModel) {
        var check = await this.likedSongDatabase.GetAllLikedSong(d)
        var ls = this.SetLs(check)
        return ls;
    }
    async SearchName(name: string, iduser: string) {
        var ls = await this.likedSongDatabase.SearchName(name, iduser)
        return this.SetLs(ls)
    }
    async GetAllByIdPlayList(id_user_liked: string, id_playlist: string) {
        var ls = await this.likedSongDatabase.GetAllByIdPlayList(id_user_liked, id_playlist)
        return this.SetLs(ls)
    }
    SetLs(ls: any) {
        if (ls == undefined) {
            return []
        }
        var check: LikedSongModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new LikedSongModel()
            temp.setAll(element)
            check.push(temp)
        }
        return check
    }
}


var likedSongService = new LikedSongService(new LikedSongDatabase())

export default likedSongService