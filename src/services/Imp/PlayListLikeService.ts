import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Mysql2 from "../../config/Config";
import { PlayListLikeModel } from "../../model/PlaylistLikeModel";

class PlayListLikeService {
    async Add(user_id: string, playlist_id: string) {
        let sql = "INSERT INTO playlistlikes(User_ID, PlayList_id) VALUES (?,?)"
        let check = await Mysql2.query(sql, [user_id, playlist_id])as ResultSetHeader
        return check
    }
    async Delete(user_id: string, playlist_id: string) {
        let sql = "DELETE FROM playlistlikes WHERE User_ID=? AND PlayList_id=?"
        let check = await Mysql2.query(sql, [user_id, playlist_id]) as ResultSetHeader
        return check
    }
    async Get(user_id: string, playlist_id: string) {
        let sql = "SELECT playlist.* FROM playlistlikes, playlist WHERE playlistlikes.User_ID =? AND playlistlikes.PlayList_id=? AND playlist.id = playlistlikes.PlayList_id"
        let check = await Mysql2.query(sql, [user_id, playlist_id]) as RowDataPacket[]
        return check.length > 0 ? this.Setls(check)[0] : undefined
    }
    async GetAll(user_id: string) {
        let sql = "SELECT playlist.* FROM playlistlikes, playlist WHERE playlistlikes.User_ID =? AND playlist.id = playlistlikes.PlayList_id ORDER BY playlistlikes.data DESC"
        let check = await Mysql2.query(sql, [user_id])
        return this.Setls(check)
    }
    async UpdateDate(user_id: string, PlayList_id: string) {
        let sql = "UPDATE playlistlikes SET `data`=CURRENT_TIMESTAMP() WHERE PlayList_id =? AND User_ID=? "
        let check = await Mysql2.query(sql, [PlayList_id, user_id])
        return this.Setls(check)
    }
    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: PlayListLikeModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new PlayListLikeModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
}

const playListLikeServiceImp = new PlayListLikeService()
export default playListLikeServiceImp