import Mysql2 from "../../config/Config";
import GenreDatase from "../../database/GenreDatase";
import GenreModel from "../../model/GenreModel";
import { v4 as uuidv4 } from 'uuid';
export class GenreService {
    constructor() {
    }
    async Add(genre: GenreModel) {
        if (genre.Floor == 0) {
            var num = await this.GetMaxRight()
            genre.LeftGenre = num + 1
            genre.RightGenre = num + 2
            genre.idParent = "0"
            genre.Id = uuidv4()

            genre.Floor = 0
        } else {
            var temp = await this.Get(genre.idParent)
            if (!temp) {
                return undefined
            }
            let check = await this.CreateBlank(temp.RightGenre)
            if (!check) {
                return undefined
            }
            genre.LeftGenre = temp.RightGenre
            genre.RightGenre = temp.RightGenre + 1
            genre.idParent = temp.Id
            genre.Id = uuidv4()

            genre.Floor = temp.Floor + 1
        }
        var sql = " INSERT INTO genre(Id, Name, RightGenre, LeftGenre,idParent,Floor) VALUES (?,?,?,?,?,?)"
        var check
        check = await Mysql2.query(sql, [genre.Id, genre.Name, genre.RightGenre, genre.LeftGenre, genre.idParent, genre.Floor])
        return check
    }
    async Get(id: string) {
        var check, l
        var sql = "SELECT * FROM genre WHERE Id=? "
        var check
        l = await Mysql2.query(sql, [id]) as GenreModel[]

        if (l && l.length > 0) {
            check = new GenreModel()
            check.setAll(l[0])
        }
        return check
    }
    async GetAll() {
        var sql = "SELECT * FROM genre ORDER BY Floor ASC "
        var check
        check = await Mysql2.query(sql, [])
        return this.Setls(check)
    }
    async GetAllLeftAndRight(Left: string, Right: string) {
        var sql = "SELECT * FROM genre where LeftGenre > ? AND RightGenre < ?"
        var check
        check = await Mysql2.query(sql, [Left, Right])
        return this.Setls(check)
    }

    async GetGenreByName(name: string) {
        var check, l

        var sql = "SELECT * FROM genre where Name LIKE ?"
        var check
        l = await Mysql2.query(sql, [`%${name}%`]) as GenreModel[]

        if (l && l.length > 0) {
            check = new GenreModel()
            check.setAll(l[0])
        }

        return check
    }
    async GetAllByidParent(idParent: string) {
        var sql = "SELECT * FROM genre where idParent = ?"
        var check
        check = await Mysql2.query(sql, [idParent])
        return this.Setls(check)
    }
    async GetMaxRight() {
        var sql = "SELECT MAX(RightGenre) as max FROM genre "
        var l: any = await Mysql2.query(sql, []) as []
        var check = -1
        if (l && l[0]["max"]) {
            check = l[0]["max"]
        }
        return check
    }

    async CreateBlank(Right: number) {
        var sql = "UPDATE genre SET RightGenre = RightGenre + 2 WHERE RightGenre >= ? "
        var sql2 = "UPDATE genre SET LeftGenre = LeftGenre + 2 WHERE LeftGenre > ?"
        var check = await Promise.all([Mysql2.query(sql, [Right]), Mysql2.query(sql2, [Right])])
        return check
    }
    async UpdateName(name: string, id: string) {
        var sql = "UPDATE genre SET Name = ? WHERE Id =? "
        var check = await Mysql2.query(sql, [name, id])
        return check
    }
    async DeleteBlank(id: string) {
        var genre = await this.Get(id)

        if (!genre) {
            return undefined
        }
        var check
        if (genre.RightGenre - genre.LeftGenre !== 1) {
            return undefined

        }


        var sql = "UPDATE genre SET RightGenre = RightGenre - 2 WHERE RightGenre > ? "
        var sql2 = "UPDATE genre SET LeftGenre = LeftGenre - 2 WHERE LeftGenre > ?"
        check = await Promise.all([Mysql2.query(sql, [genre.RightGenre + ""]), Mysql2.query(sql2, [genre.RightGenre + ""])])

        return check
    }
    async Delete(id: string) {
        var check = await this.DeleteBlank(id)
        if (check == undefined) {
            return undefined
        }
        var sql = "DELETE FROM genre WHERE id = ?"
        var check1 = await Mysql2.query(sql, [id])
        return check1
    }

    async GetIdParentByIdplaylist(IdPlaylist: string) {
        var sql = ` SELECT g2.* FROM genre g1,playlist pl, genre g2
        WHERE pl.Genre_ID=g1.Id AND pl.id= ? AND g1.LeftGenre >= g2.LeftGenre AND g2.RightGenre >= g1.RightGenre`
        var check = await Mysql2.query(sql, [IdPlaylist])
        return this.Setls(check)
    }
    async GetAllByLimitFloor(floor: number) {
        var sql = "SELECT * FROM genre where Floor < ? ORDER BY Floor ASC "
        var check
        check = await Mysql2.query(sql, [floor])
        return this.Setls(check)
    }
    async GetChildrenByIdParent(idParent: string) {
        var sql = "SELECT g2.* FROM genre g1,genre g2 WHERE g1.id =? AND g1.RightGenre > g2.RightGenre AND g1.LeftGenre < g2.LeftGenre "
        var check
        check = await Mysql2.query(sql, [idParent])
        return this.Setls(check)
    }
    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: GenreModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var genre = new GenreModel()
            genre.setAll(element)
            list.push(genre)

        }
        return list
    }
}


var genreServiceImp = new GenreService()


export default genreServiceImp


