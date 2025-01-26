import Mysql2 from "../config/Config"
import ArtistManagementModel from "../model/ArtistManagementModel"

class ArtistManagementService {
    async Add(idArtist: string) {
        var sql = `INSERT INTO artistmanagement(idArtist) VALUES (?)`
        var check = await Mysql2.query(sql, [idArtist])
        return check
    }
    async Get(idArtist: string) {
        var sql = `SELECT * FROM artistmanagement WHERE idArtist=?`
        var check = await Mysql2.query(sql, [idArtist])
        return this.Setls(check)[0]
    }
    async GetCount() {
        var sql = `SELECT count(*) as count FROM artistmanagement`
        var check = await Mysql2.query(sql, []) as any
        return check[0]
    }
    async GetAll(start: number, count: number) {
        var sql = `SELECT * FROM artistmanagement a ,user u WHERE a.idArtist=u.id LIMIT ?,?`
        var check = await Mysql2.query(sql, [start, count])
        return this.Setls(check)
    }
    async GetWithout(start: number, count: number) {
        var sql = `SELECT * FROM user WHERE id NOT IN (SELECT idArtist FROM artistmanagement) AND Vertify = 1 LIMIT ?,?`
        var check = await Mysql2.query(sql, [start, count])
        return this.Setls(check)
    }
    async Delete(id: string) {
        var sql = `DELETE FROM artistmanagement WHERE idArtist=?`
        var check = await Mysql2.query(sql, [id])
        return this.Setls(check)
    }
    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: ArtistManagementModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new ArtistManagementModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
}

var artistManagementService = new ArtistManagementService()

export default artistManagementService