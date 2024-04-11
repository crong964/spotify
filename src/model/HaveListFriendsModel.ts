import UserModel from "./UserModel"

export default class HaveListFriendsModel extends UserModel {
    iduser: string
    idfriend: string
    IsFriend: number
    constructor() {
        super()
        this.IsFriend = 0
        this.idfriend = ""
        this.iduser = ""
    }
}