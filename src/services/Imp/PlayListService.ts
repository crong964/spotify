import { ResultSetHeader, RowDataPacket } from "mysql2"
import Mysql2 from "../../config/Config"
import PlayListDatabase from "../../database/PlayListDatabase"
import { PlayListModel } from "../../model/PlayListModel"

export class PlayListService {
    Get8FirstRecentPlaylist(User_ID: string, ID: string) {
        throw new Error("Method not implemented.")
    }
    GetByUser(id: any, arg1: number, arg2: number) {
        throw new Error("Method not implemented.")
    }
    playlist: PlayListDatabase
    constructor(playlist: PlayListDatabase) {
        this.playlist = playlist
    }
    async Add(d: PlayListModel) {
        var sql = "INSERT INTO playlist(id, User_id, Genre_ID, Type, ImagePath, PlayListName, Likes, Songs, Duration, Status, Discripition) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
        var check: ResultSetHeader
        check = await Mysql2.query(sql, [d.id, d.User_id, d.Genre_ID, d.Type, d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition]) as ResultSetHeader
        return check
    }
    async AddArtists(d: PlayListModel) {
        var sql = "INSERT INTO playlist(id, User_id, Genre_ID, Type, ImagePath, PlayListName, Likes, Songs, Duration, Status, Discripition) VALUES (?,?,?,'artist',?,?,?,?,?,?,?)"
        var check
        check = await Mysql2.query(sql, [d.id, d.User_id, d.Genre_ID, d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition])
        return check
    }
    async GetArtistsByUserid(id: string) {
        var sql = "SELECT * FROM playlist WHERE User_id = ? AND Type='artist'"
        var check
        check = await Mysql2.query(sql, [id])

        return this.SetLs(check)[0]
    }
    async Get(id: string) {
        var sql = "SELECT * FROM playlist WHERE id=?"
        var check
        check = await Mysql2.query(sql, [id])
        var ls = this.SetLs(check)
        return ls.length > 0 ? ls[0] : undefined;
    }
    async GetByGenre(Genre_ID: string, s: number, f: number) {
        var sql = `SELECT * FROM playlist WHERE Genre_ID in (SELECT g1.Id FROM genre g1, genre g2   WHERE g2.Id =? AND g1.LeftGenre >= g2.LeftGenre AND g1.RightGenre <= g2.RightGenre ) AND Type = 'playlist' LIMIT ?,? `
        var check = await Mysql2.query(sql, [Genre_ID, s, f])
        return this.SetLs(check)
    }
    async GetByUser_id(User_id: string) {
        var sql = "SELECT * FROM playlist WHERE User_id=?"
        var ls = await Mysql2.query(sql, [User_id])
        return this.SetLs(ls)
    }
    async Update(d: PlayListModel) {
        var sql = "UPDATE playlist SET ImagePath=?,PlayListName=?,Likes=?,Songs=?,Duration=?,Status=?,Discripition=? WHERE id =?"
        var check
        check = await Mysql2.query(sql, [d.ImagePath, d.PlayListName, d.Likes, d.Songs, d.Duration, d.Status, d.Discripition, d.id])
        return check
    }
    async UpdateNameImage(d: PlayListModel) {
        var sql = "UPDATE playlist SET ImagePath=?,PlayListName=?,Discripition=? WHERE id =? AND User_id=?"
        var check
        check = await Mysql2.query(sql, [d.ImagePath, d.PlayListName, d.Discripition, d.id, d.User_id])
        return check
    }
    async VertifyPlaylist(idArtist: string, status: string) {
        var sql = "UPDATE playlist SET Status=? WHERE User_id =? AND Type='artist'"
        var check
        check = await Mysql2.query(sql, [status, idArtist])
        return check
    }
    SetLs(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: PlayListModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new PlayListModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
    async SearchPlaylistName(playlistName: string) {
        var sql = `SELECT * FROM playlist WHERE Type=1 AND PlayListName LIKE ?`
        var ls = await Mysql2.query(sql, [`%${playlistName}%`])
        return this.SetLs(ls)
    }

    async GetPlayListLimit(start: number, count: number) {
        var sql = "SELECT * FROM playlist where Type='playlist' LIMIT ?,?"
        var ls = await Mysql2.query(sql, [start, count])
        return this.SetLs(ls)
    }
    async GetCountPlayListLimit() {
        var sql = "SELECT count(*) as count FROM playlist where Type='playlist' "
        var ls = await Mysql2.query(sql, [])
        return this.SetLs(ls)
    }
    async GetPlayListArtistLimit(start: number, count: number, User_ID: string) {
        var sql = `SELECT * FROM playlist where Type='artist' AND playlist.id NOT IN (SELECT playlistlikes.PlayList_id FROM playlistlikes WHERE playlistlikes.User_ID =?) AND  status=1 LIMIT ?,?`
        var ls = await Mysql2.query(sql, [User_ID, start, count])
        return this.SetLs(ls)
    }
    async CountPlayListArtist(User_ID: string) {
        var sql = `SELECT count(*) as count FROM playlist where Type='artist' AND status=1 AND playlist.id NOT IN (SELECT playlistlikes.PlayList_id FROM playlistlikes WHERE playlistlikes.User_ID =?)`
        var ls = await Mysql2.query(sql, [User_ID]) as RowDataPacket[]
        return ls ? ls[0] : { count: 0 }
    }
    async GetPlayListArtist(User_id: string) {
        var sql = `SELECT * FROM playlist where User_id=? AND Type='artist'`
        var ls = await Mysql2.query(sql, [User_id])
        return this.SetLs(ls)[0]
    }
    async DeletePlaylist(id: string) {
        var sql = `Delete from playlist where id=?`
        var ls = await Mysql2.query(sql, [id]) as ResultSetHeader
        return ls
    }
    async DeleteSongInPlayList(id: string) {
        var sql = `Delete From contain where PlayList_id=?`
        var check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async GetUserByArrayId(id: string[]) {
        let sql = "SELECT * FROM playlist where "
        for (let i = 0; i < id.length; i++) {
            if (i == id.length - 1) {
                sql += ` User_id=?`
                continue
            }
            sql += ` User_id=? or`
        }
        let check = await Mysql2.query(sql, id)
        return this.SetLs(check)
    }
}

var playListServiceImp: PlayListService = new PlayListService(new PlayListDatabase())

export default playListServiceImp