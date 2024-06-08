import BaseModel from "./BaseModel";

export default class RecentPlaylistModel extends BaseModel {
    User_ID: string
    ID: string
    CreateTime: string
    PlayListName: string
    Type: string
    ImagePath: string
    constructor() {
        super()
        this.User_ID = ""
        this.ID = ""
        this.CreateTime = ""
       this.PlayListName=""
        this.Type = ""
        this.ImagePath=""
    }

}