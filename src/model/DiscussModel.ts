import BaseModel from "./BaseModel";
import UserModel from "./UserModel";

export default class DiscussModel extends UserModel {
    User_Id: string
    Discuss_Id: string
    Parent_discuss_Id: string
    Replay_Discuss_Id: string
    Replay_quality: string
    Content: string
    Type: string
    Song_Id: string
    constructor() {
        super()
        this.User_Id = ""
        this.Discuss_Id = ""
        this.Parent_discuss_Id = ""
        this.Replay_Discuss_Id = ""
        this.Replay_quality = ""
        this.Content = ""
        this.Type = ""
        this.Song_Id = ""

    }
}