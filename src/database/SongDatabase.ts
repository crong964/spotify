import mysql2 from "mysql2/promise"
import SongModel from "../model/SongModel"
import Mysql2 from "../config/Config"
class SongDatabase {

    async Add(d: SongModel) {
        var sql = " INSERT INTO song(Id, user_id, genre_id, Singer, Duration, PublicDate,imagePath,filePath) VALUES(?, ?, ?, ?, ?, ?,?,?)"
        var check
        check = await Mysql2.query(sql, [d.Id, d.user_id, d.Genre_id, d.Singer, d.Duration, d.publicDate, d.imagePath, d.filePath])
        return check
    }
    async Get(id: string) {
        var sql = " SELECT * FROM song WHERE Id=?"
        var check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async GetAll(user_id: string) {
        var sql = " SELECT * FROM song WHERE user_id = ?"
        var check
        check = await Mysql2.query(sql, [user_id])
        return check
    }
    async Delete(id: string) {
        var sql = "DELETE FROM `song` WHERE Id=?"
        var check
        check = await Mysql2.query(sql, [id])
        return check
    }
    async Update(d: SongModel) {
        var sql = `UPDATE song Set genre_id =?, SongName=?, Duration=?, publicDate=?, description=?,imagePath=?,filePath=?, Singer=?
        WHERE Id =?`

        var check
        check = await Mysql2.query(sql, [d.Genre_id, d.SongName, d.Duration, d.publicDate, d.description, d.imagePath, d.filePath, d.Singer, d.Id])
        return check
    }
    async UpStatus(d: SongModel) {
        var sql = `UPDATE song Set status=?
        WHERE Id =?`
        var check
        check = await Mysql2.query(sql, [d.status, d.Id])
        return check
    }
    async GetValidateAll(user_id: string) {
        var sql = " SELECT * FROM song WHERE user_id = ? AND status = 1"
        var check
        check = await Mysql2.query(sql, [user_id])
        return check
    }

}

export default SongDatabase