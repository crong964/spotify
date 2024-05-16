import BaseModel from "./BaseModel";

export default class RecentPlaylistModel extends BaseModel {
    User_ID: string
    ID: string
    CreateTime: string
    name: string
    type: string
    image: string
    constructor() {
        super()
        this.User_ID = ""
        this.ID = ""
        this.CreateTime = ""
        this.name = ""
        this.type = ""
        this.image=""
    }

}