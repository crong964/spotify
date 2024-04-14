import UserDatabase from "../database/UserDatabase";
import UserModel from "../model/UserModel";

export class UserService {
    userDatabae: UserDatabase
    constructor(i: UserDatabase) {
        this.userDatabae = i
    }
    async Add(d: UserModel) {
        var check
        await this.userDatabae.Add(d)

        return check
    }
    async Get(id: string) {
        var user: UserModel | undefined
        var check = await this.userDatabae.Get(id) as UserModel[]
        if (check && check.length > 0) {
            user = new UserModel()
            user.setAll(check[0])
        }
        return user
    }
    async VertifyAccount(user_id: string, Vertify: string) {
        var check = await this.userDatabae.VertifyAccount(user_id, "1")
        return check
    }
    async GetByAccount(account: string) {
        var user: UserModel | undefined
        var check = await this.userDatabae.GetByAccount(account) as UserModel[]
        if (check && check.length > 0) {
            user = new UserModel()
            user.setAll(check[0])
        }
        return user
    }
    async getAllArtist(Vertify: string) {
        var check
        check = await this.userDatabae.getAllArtist(Vertify)
        var ls = this.SetList(check)
        return ls
    }
    async GetAccountByAccAndPass(acc: string, pass: string) {
        var user: UserModel | undefined
        var check = await this.userDatabae.GetAccountByAccAndPass(acc, pass) as UserModel[]
        if (check && check.length > 0) {
            user = new UserModel()
            user.setAll(check[0])
        }
        return user
    }
    SetList(ls: any) {
        if (ls == undefined) {
            return []
        }
        var check: UserModel[] = []
        for (let id = 0; id < ls.length; id++) {
            const element = ls[id];
            var user = new UserModel()
            user.setAll(element)
            check.push(user)
        }

        return check
    }
    async AddAccount(d: UserModel) {
        var check
        check = await this.userDatabae.AddAccount(d)
        return check
    }
    async UpdatePassword(d: UserModel) {
        var check
        check = await this.userDatabae.UpdatePassword(d)
        return check
    }

    async SearchNameArtist(name: string) {
        var ls = await this.userDatabae.SearchNameArtist(name)
        return this.SetList(ls)
    }
    async Update(d: UserModel) {
        var check
        check = await this.userDatabae.Update(d)
        return check
    }
    async GetAllUserByType(Vertify: "" | "0" | "1") {
        var ls = await this.userDatabae.GetAllUserByType(Vertify)
        return this.SetList(ls)
    }
}


var userService = new UserService(new UserDatabase())

export default userService