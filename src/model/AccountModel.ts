import BaseModel from "./BaseModel";

export default class AccountModel extends BaseModel {
    Account: string
    Password: string
    id: string
    constructor() {
        super()
        this.Account = ""
        this.Password = ""
        this.id = ""
    }

}