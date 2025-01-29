import Mysql2 from "../config/Config";
import { limit } from "../config/Helper";
import SongDatabase from "../database/SongDatabase";

import SongModel from "../model/SongModel";

export class SongService {
    songDatabase: SongDatabase
    constructor(songDatabase: SongDatabase) {
        this.songDatabase = songDatabase
    }
    async Add(d: SongModel) {
        var check = await this.songDatabase.Add(d)
        return check
    }
    async Get(id: string) {
        var check, song: SongModel | undefined
        check = await this.songDatabase.Get(id) as SongModel[]
        if (check && check.length > 0) {
            song = new SongModel()
            song.setAll(check[0])
        }
        return song
    }
    async GetAll(user_id: string) {
        var sql = ` SELECT song.* FROM song,playlist,contain WHERE playlist.user_id=? AND playlist.Type='artist' AND contain.Song_ID=song.Id AND contain.PlayList_id=playlist.id `
        var check = await Mysql2.query(sql, [user_id])
        var ls: SongModel[] = this.SetLs(check)
        return ls
    }
    async Delete(id: string) {
        var sql = "DELETE FROM song WHERE Id=?"
        var check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async Update(d: SongModel) {
        var sql = `UPDATE song Set genre_id =?,SongName=?, Duration=?, publicDate=?, description=?,SongImage=?, Singer=?,user_id=?
        WHERE Id =?`
        var check
        check = await Mysql2.query(sql, [d.Genre_id, d.SongName, d.Duration, d.publicDate, d.description, d.SongImage, d.Singer, d.user_id, d.Id])
        return check
    }
    async UpStatus(d: SongModel) {
        var sql = `UPDATE song Set status=? WHERE Id =?`
        var check = await Mysql2.query(sql, [d.status, d.Id])
        return check
    }
    async GetValidateAll(user_id: string) {
        var check
        check = await this.songDatabase.GetValidateAll(user_id) as []
        return this.SetLs(check)
    }

    async GetSongByGenre(idGenre: string, p: limit) {
        p.start = p.start | 0
        p.end = p.end | 100
        var check
        check = await this.songDatabase.GetSongByGenre(idGenre, p) as []
        return this.SetLs(check)
    }
    async GetSongByTabs(idGenre: string, idPlaylist: string, p: limit) {
        p.start = p.start | 0
        p.end = p.end | 100
        var check
        check = await this.songDatabase.GetSongByTabs(idGenre, idPlaylist, p) as []
        return this.SetLs(check)
    }
    async IncreaseNumberDiscuss(SongId: string, n?: number) {
        n = n || 1
        var check
        check = await this.songDatabase.IncreaseNumberDiscuss(SongId, n)
        return check
    }
    async DeincreaseNumberDiscuss(SongId: string, n?: number) {
        n = n || 1
        var check
        check = await this.songDatabase.DeincreaseNumberDiscuss(SongId, n)
        return check
    }

    async NextSong(SongId: string) {
        var sql = `SELECT * FROM song WHERE id <> ?`
        var check
        check = await Mysql2.query(sql, [SongId])
        return this.SetLs(check)
    }
    SetLs(check: any) {
        if (check == undefined) {
            return []
        }
        var ls: SongModel[] = []
        for (let i = 0; i < check.length; i++) {
            const element = check[i];
            var song = new SongModel()
            song.setAll(element)
            ls.push(song)
        }
        return ls
    }
    async IncreaseView(SongId: string) {
        var sql = `UPDATE song SET Viewer = Viewer + 1 WHERE id=?`
        var check = await Mysql2.query(sql, [SongId])
        return check
    }
}

var songDatabase = new SongDatabase()
var songService = new SongService(songDatabase)


export default songService
