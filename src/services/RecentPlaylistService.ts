import Mysql2 from "../config/Config";
import RecentPlaylistModel from "../model/RecentPlaylistModel";

export class RecentPlaylistService {
    constructor() {

    }

    async Add(d: RecentPlaylistModel) {
        var sql = `INSERT INTO recentplaylist(User_ID, ID, name, type,image) VALUES (?,?,?,?,?)`
        var ls = await Mysql2.query(sql, [d.User_ID, d.ID, d.name, d.type, d.image])
        return ls
    }
    async Get(User_ID: string, ID: string) {
        var sql = `SELECT * FROM recentplaylist WHERE User_ID=? AND ID=?`
        var ls = await Mysql2.query(sql, [User_ID, ID])
        return this.SetLs(ls)[0]
    }
    async GetByUser(User_ID: string, s: number, count: number) {
        var sql = `SELECT * FROM recentplaylist WHERE User_ID=? ORDER BY CreateTime DESC LIMIT ?,?`
        var ls = await Mysql2.query(sql, [User_ID, s, count])
        return this.SetLs(ls)
    }


    SetLs(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: RecentPlaylistModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new RecentPlaylistModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
}

const recentPlaylistService = new RecentPlaylistService()

export default recentPlaylistService