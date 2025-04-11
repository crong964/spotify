import mysql2 from "mysql2/promise"
import SongModel from "../model/SongModel"
import Mysql2 from "../config/Config"
class SongDatabase {

    async Add(d: SongModel) {
        let sql = " INSERT INTO song(Id, user_id, genre_id, Singer, Duration, PublicDate,SongImage,filePath) VALUES(?, ?, ?, ?, ?, ?,?,?)"
        let check
        check = await Mysql2.query(sql, [d.Id, d.user_id, d.Genre_id, d.Singer, d.Duration, d.publicDate, d.SongImage, d.filePath])
        return check
    }
    async Get(id: string) {
        let sql = " SELECT * FROM song WHERE Id=?"
        let check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async GetAll(user_id: string) {
        let sql = " SELECT * FROM song WHERE user_id = ?"
        let check
        check = await Mysql2.query(sql, [user_id])
        return check
    }
    async Delete(id: string) {
        let sql = "DELETE FROM `song` WHERE Id=?"
        let check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async Update(d: SongModel) {
        let sql = `UPDATE song Set genre_id =?, SongName=?, Duration=?, publicDate=?, description=?,SongImage=?, Singer=?
        WHERE Id =?`

        let check
        check = await Mysql2.query(sql, [d.Genre_id, d.SongName, d.Duration, d.publicDate, d.description, d.SongImage, d.Singer, d.Id])
        return check
    }
    async UpStatus(d: SongModel) {
        let sql = `UPDATE song Set status=? WHERE Id =?`
        let check
        check = await Mysql2.query(sql, [d.status, d.Id])
        return check
    }
    async GetValidateAll(user_id: string) {
        let sql = " SELECT * FROM song WHERE user_id = ? AND status = 1"
        let check
        check = await Mysql2.query(sql, [user_id])
        return check
    }

    async GetSongByGenre(idGenre: string, limit: any) {
        let sql = `SELECT * FROM song
        WHERE song.genre_id in 
        (SELECT g1.Id 
            FROM genre g1, genre g2 
            WHERE g2.Id=?
            AND g1.LeftGenre >= g2.LeftGenre AND g1.RightGenre <= g2.RightGenre ) AND status=1 
            LIMIT ?,?`
        let check
        check = await Mysql2.query(sql, [idGenre, limit.start, limit.end])
        return check
    }
    async GetSongByTabs(idGenre: string, idPlaylist: string, limit: any) {
        let ls = idGenre.split(" ")
        let s = ""
        let ps: string[] = []
        for (let i = 0; i < ls.length - 1; i++) {
            const element = ls[i];
            s += `Genre_id LIKE ? AND `
            ps.push(`%${element}%`)
        }
        s += `Genre_id LIKE ? `
        ps.push(`%${ls[ls.length - 1]}%`)
        let sql = `SELECT * FROM song WHERE ${s} AND song.Id NOT IN (SELECT Song_ID FROM contain WHERE PlayList_id=?)
        LIMIT ?,?`
        let check
        check = await Mysql2.query(sql, [...ps, idPlaylist, limit.start, limit.end])
        return check
    }
    async GetCountSongByTabs(idGenre: string, idPlaylist: string) {
        let ls = idGenre.split(" ")
        let s = ""
        let ps: string[] = []
        for (let i = 0; i < ls.length - 1; i++) {
            const element = ls[i];
            s += `Genre_id LIKE ? AND `
            ps.push(`%${element}%`)
        }
        s += `Genre_id LIKE ? `
        ps.push(`%${ls[ls.length - 1]}%`)
        let sql = `SELECT count(*) as count FROM song WHERE ${s} AND song.Id NOT IN (SELECT Song_ID FROM contain WHERE PlayList_id=?)`
        let check
        check = await Mysql2.query(sql, [...ps, idPlaylist])
        return check
    }
    async IncreaseNumberDiscuss(SongId: string, n: number) {
        let sql = `UPDATE song SET dicussquality=dicussquality + ? WHERE id=?`
        let check
        check = await Mysql2.query(sql, [n, SongId])
        return check
    }
    async DeincreaseNumberDiscuss(SongId: string, n: number) {
        let sql = `UPDATE song SET dicussquality=dicussquality - ? WHERE id=?`
        let check
        check = await Mysql2.query(sql, [n, SongId])
        return check
    }
    async SearchSongNameWithoutPlaylist(SongName: string, idPlaylist: string, status = 1) {
        let sql = `SELECT * FROM song WHERE song.SongName LIKE ? AND song.status= ? AND
 song.Id NOT IN (SELECT contain.Song_ID FROM contain WHERE contain.PlayList_id =?) LIMIT 0,10`
        let check = await Mysql2.query(sql, [`%${SongName}%`, status, idPlaylist]) as []
        return check
    }
    //+cpop +sad
    async GetSongWithoutAtPublicPlayList(genre: string, start: number, count: number, status = 1) {
        let sql = `SELECT song.*
        FROM song
        WHERE song.status=? AND song.Id NOT IN (SELECT contain.Song_ID 
        FROM playlist,contain
        WHERE playlist.Type='playlist' AND playlist.id=contain.PlayList_id) AND
        MATCH(Genre_id) AGAINST(? IN BOOLEAN MODE )
        LIMIT ?,?`
        let check = await Mysql2.query(sql, [ status,genre, start, count]) as []
        return check
    }
    async GetCountSongWithoutAtPublicPlayList(genre: string, status = 1) {
        let sql = `SELECT count(*) as count 
        FROM song WHERE song.status=? 
        AND song.Id NOT IN (SELECT contain.Song_ID  FROM playlist,contain
        WHERE playlist.Type='playlist' 
        AND playlist.id=contain.PlayList_id) AND
        MATCH(Genre_id) AGAINST(? IN BOOLEAN MODE )
        `
        let check = await Mysql2.query(sql, [status,genre]) as []
        return check
    }
}
//SELECT g1.* FROM genre g1, genre g2 WHERE g2.Id="0a57712c-1d83-4d65-8d35-e931fb0c4e11" AND g1.LeftGenre >= g2.LeftGenre AND g1.RightGenre <= g2.RightGenre
export default SongDatabase