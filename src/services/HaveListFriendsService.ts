import HaveListFriendsDatabase from "../database/HaveListFriendsDatabase";
import HaveListFriendsModel from "../model/HaveListFriendsModel";

export class HaveListFriendsService {
    data: HaveListFriendsDatabase
    constructor(i: HaveListFriendsDatabase) {
        this.data = i
    }

    async InsertListFriends(idUser: string, idFriend: string, IsFriend: "Request" | "Responsd" | "Friend") {
        var d: any = {
            "Request": "0",
            "Responsd": "1",
            "Friend": "2"
        }
        var check = await this.data.InsertListFriends(idUser, idFriend, d[IsFriend])
        return check
    }

    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var lts: HaveListFriendsModel[] = []

        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new HaveListFriendsModel()
            temp.setAll(element)
            lts.push(temp)
        }
        return lts
    }
    async Get(idUser: string, idAddFriends: string) {
        var check = await this.data.Get(idUser, idAddFriends)
        return this.Setls(check)[0]
    }
    async GetAllTypeFriend(idUser: string, IsFriend: "Request" | "Responsd" | "Friend") {
        var d: any = {
            "Request": "0",
            "Responsd": "1",
            "Friend": "2"
        }


        var check = await this.data.GetAllTypeFriend(idUser, d[IsFriend])
        return check
    }
    async CancelFriends(idUser: string, idFriend: string) {
        var check = await this.data.CancelFriends(idUser, idFriend)
        return check
    }
    async AcceptRequset(idUser: string, idFriend: string) {
        var check = await this.data.UpDateType(idUser, idFriend, "2")
        return check
    }
    async SearchName(name: string, iduse: string, type?: string) {
        type = type || ""
        var check = await this.data.SearchName(name, iduse, type)
        return this.Setls(check)
    }
    async SearchOther(name: string, iduse: string) {
        var check = await this.data.SearchOther(name, iduse)
        return this.Setls(check)
    }
}

var haveListFriendsService = new HaveListFriendsService(new HaveListFriendsDatabase())
export default haveListFriendsService