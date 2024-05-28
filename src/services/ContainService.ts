import { ResultSetHeader } from "mysql2";
import ContainDatabse from "../database/ContainDatabse";
import ContainModel from "../model/ContainModel";
import Mysql2 from "../config/Config";

export class ContainService {
    constructor() {
    }
    async Add(d: ContainModel) {

        var sql = " INSERT INTO contain(Song_id, PlayList_id) VALUES (?,?) "
        var check
        check = await Mysql2.query(sql, [d.Song_id, d.PlayList_id]) as ResultSetHeader
        return check
    }
    async Get(d: ContainModel) {
        var sql = ` SELECT * FROM contain WHERE Song_id=? AND PlayList_id=? `
        var check
        check = await Mysql2.query(sql, [d.Song_id, d.PlayList_id])
        var ls = this.Setls(check)
        return ls.length > 0 ? ls[0] : undefined;
    }
    async Delete(d: ContainModel) {
        var sql = `DELETE FROM contain WHERE Song_id=? AND PlayList_id=? `
        var check
        check = await Mysql2.query(sql, [d.Song_id, d.PlayList_id])
        return check
    }
    async GetAllByPlayList(PlayList_id: string) {
        var sql = "SELECT song.Id,song.SongName,song.Viewer,song.Singer,song.Duration,song.filePath,song.SongImage, contain.TimeCreate FROM contain,song WHERE contain.Song_ID=song.Id AND contain.PlayList_id=?"
        var check
        check = await Mysql2.query(sql, [PlayList_id])
        return this.Setls(check)
    }
    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: ContainModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new ContainModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
}

var containService = new ContainService()

export default containService