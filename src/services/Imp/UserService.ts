import Mysql2 from "../../config/Config";
import UserDatabase from "../../database/UserDatabase";
import UserModel from "../../model/UserModel";

export class UserService {
    userDatabae: UserDatabase
    constructor(i: UserDatabase) {
        this.userDatabae = i
    }
    async Add(d: UserModel) {
        console.log(d);

        let check
        try {
            check = await this.userDatabae.AddAccount(d)

        } catch (error) {
            console.log(error);

        }
        return check
    }
    async Get(id: string) {
        let user: UserModel | undefined
        let check = await this.userDatabae.Get(id) as UserModel[]
        if (check && check.length > 0) {
            user = new UserModel()
            user.setAll(check[0])
        }
        return user
    }
    async VertifyAccount(user_id: string, Vertify: string) {
        let check = await this.userDatabae.VertifyAccount(user_id, Vertify)
        return check
    }

    async getAllArtist(Vertify: string) {
        let check
        check = await this.userDatabae.getAllArtist(Vertify)
        let ls = this.SetList(check)
        return ls
    }

    SetList(ls: any) {
        if (ls == undefined) {
            return []
        }
        let check: UserModel[] = []
        for (let id = 0; id < ls.length; id++) {
            const element = ls[id];
            let user = new UserModel()
            user.setAll(element)
            check.push(user)
        }

        return check
    }
    async AddAccount(d: UserModel) {
        let sql = "INSERT INTO user(id, Name, Vertify, Nationality, ChanalName, pathImage, description, RefeshToken, Banner,role) VALUES (?,?,?,?,?,?,?,?,?,?)"
        let check = await Mysql2.query(sql, [d.id, d.Name, d.Vertify, d.Nationality, d.ChanalName, d.pathImage, d.description, d.RefeshToken, d.Banner, d.role])
        return check

    }

    async SearchNameArtist(name: string) {
        let sql = "SELECT * FROM user WHERE user.role ='user' AND Name like ? AND Vertify = 1 "
        let check
        check = await Mysql2.query(sql, [`%${name}%`])
        return this.SetList(check)
    }
    async Update(d: UserModel) {
        let sql = "UPDATE user SET Name=?,Nationality=?,ChanalName=?,pathImage=? ,Banner=? WHERE id=? "
        let check
        check = await Mysql2.query(sql, [d.Name, d.Nationality, d.ChanalName, d.pathImage, d.Banner, d.id])
        return check
    }
    async GetAllUserByType(Vertify: "" | "0" | "1") {
        let sql = "SELECT * FROM `user` WHERE Vertify LIKE ? AND role = 'user' "
        let ls
        ls = await Mysql2.query(sql, [`%${Vertify}%`]) as []
        return this.SetList(ls)
    }
    async GetAllEAdmin(role: string) {
        let sql = "SELECT * FROM user WHERE role LIKE ? AND role <> 'master' "
        let ls
        ls = await Mysql2.query(sql, [`%${role}%`]) as []
        return this.SetList(ls)
    }
    async DeleteEAdmin(id: string) {
        let sql = "Delete FROM user WHERE id = ? AND role = 'employee' "
        let ls
        ls = await Mysql2.query(sql, [id]) as []
        return this.SetList(ls)
    }
    async Delete(id: string) {
        let sql = "Delete FROM user WHERE id = ? AND role = 'employee' "
        let ls
        ls = await Mysql2.query(sql, [id]) as []
        return this.SetList(ls)
    }
    async DeleteArtist(id: string) {
        let sql = "Delete FROM user WHERE id = ? "
        let ls
        ls = await Mysql2.query(sql, [id]) as []
        return this.SetList(ls)
    }
    async UpdateE(d: UserModel) {
        let sql = "UPDATE user SET Name=?, Password=? , role=? WHERE id= ?"
        let check = await Mysql2.query(sql, [d.Name, d.pathImage, d.role, d.id])
        return check
    }
}


const userServiceImp = new UserService(new UserDatabase())

export default userServiceImp