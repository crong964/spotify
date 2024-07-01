import BaseModel from "./BaseModel";

class UserModel extends BaseModel {
    id: string
    Vertify: string
    Nationality: string
    ChanalName: string
    Name: string
    description: string
    pathImage: string
    Banner: string
    RefeshToken: string
    role: string
    constructor() {
        super()
        this.role = "user"
        this.RefeshToken = ""
        this.Name = ""
        this.id = ""
        this.Vertify = "0"
        this.Nationality = ""
        this.ChanalName = ""
        this.description = ""
        this.pathImage = ""
        this.Banner = ""

    }
    setAll(d: any): void {
        super.setAll(d)
    }
}

export default UserModel