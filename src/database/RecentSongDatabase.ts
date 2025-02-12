import Mysql2 from "../config/Config";
import RecentSongModel from "../model/RecentSongModel";

export default class RecentSongDatabase {
    async Add(user_id: string, Id_song: string) {
        var sql = "INSERT INTO recentsong(user_id, Id) VALUES (?,?)";
        var check = await Mysql2.query(sql, [user_id, Id_song]);
        return check;
    }
    async GetAllByidUser(id: string) {
        var sql = `SELECT song.* FROM recentsong, song WHERE recentsong.user_id=? AND song.Id =recentsong.Id ORDER BY recentsong.Time ASC`;
        var check = await Mysql2.query(sql, [id]);
        return check;
    }
    async Get(user_id: string, Id_song: string) {
        var sql = `SELECT song.* FROM recentsong, song WHERE recentsong.user_id=? AND recentsong.Id=?`;
        var check = await Mysql2.query(sql, [user_id, Id_song]);
        return check;
    }
    async UpdateTime(user_id: string, Id_song: string) {
        var sql = `UPDATE recentsong SET Time=CURRENT_TIMESTAMP WHERE user_id=? AND Id=?`;
        var check = await Mysql2.query(sql, [user_id, Id_song]);
        return check;
    }
    async ListenAgainByUserId(user_id: string, start: number) {
        var sql = `SELECT song.*,likedsong.liked
            FROM song LEFT JOIN likedsong ON song.Id =likedsong.Id
            INNER JOIN recentsong ON song.Id = recentsong.Id
            WHERE recentsong.user_id =?
            GROUP BY song.id,likedsong.liked
            ORDER BY COUNT(*) ASC
            LIMIT ?,50`;
        var check = await Mysql2.query(sql, [user_id, start]);
        return check;
    }
    async Count(user_id: string) {
        var sql = `SELECT user_id FROM recentsong WHERE recentsong.user_id=? GROUP BY user_id,Id`;
        var check = await Mysql2.query(sql, [user_id]);
        return check;
    }
}