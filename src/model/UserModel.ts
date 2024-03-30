import BaseModel from "./BaseModel";

class UserModel extends BaseModel {
    id: string
    Vertify: number
    Nationality: string
    ChanalName: string
    Account: string
    Name: string
    description: string
    pathImage: string
    Password: string
    Banner:string
    RefeshToken:string
    constructor() {
        super()
        this.RefeshToken=""
        this.Password = ""
        this.Name = ""
        this.id = ""
        this.Vertify = 0
        this.Nationality = ""
        this.ChanalName = ""
        this.Account = ""
        this.description = ""
        this.pathImage = ""
        this.Banner=""

    }
    setAll(d: any): void {
        super.setAll(d)
        this.Password = ""
        this.Account=""
    }
}

export default UserModel