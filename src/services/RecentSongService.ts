import Mysql2 from "../config/Config";
import RecentSongDatabase from "../database/RecentSongDatabase";
import RecentSongModel from "../model/RecentSongModel";

export class RecentSongService {
    recentSongDatabase: RecentSongDatabase
    constructor(i: RecentSongDatabase) {
        this.recentSongDatabase = i
    }
    async Add(user_id: string, Id_song: string) {
        var check = await this.recentSongDatabase.Add(user_id, Id_song)

        return check;
    }
    async GetAllByidUser(id: string) {
        var sql = `SELECT song.* FROM recentsong, song WHERE recentsong.user_id=? AND song.Id =recentsong.Id ORDER BY recentsong.Time ASC limit 0,10`;
        var check = await Mysql2.query(sql, [id]);
        return this.SetLs(check);

    }

    async Get(user_id: string, Id_song: string) {
        var check = await this.recentSongDatabase.Get(user_id, Id_song) as RecentSongModel[]
        if (check && check.length) {
            var temp = new RecentSongModel()
            temp.setAll(check[0])
            return temp
        }
        return undefined;
    }
    async UpdateTime(user_id: string, Id_song: string) {
        var check = await this.recentSongDatabase.UpdateTime(user_id, Id_song)
        return check
    }
    SetLs(ls: any): RecentSongModel[] {
        if (ls == undefined) {
            return []
        }
        var check: RecentSongModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new RecentSongModel()
            temp.setAll(element)
            check.push(temp)
        }
        return check
    }
}


var recentSongService = new RecentSongService(new RecentSongDatabase())

export default recentSongService