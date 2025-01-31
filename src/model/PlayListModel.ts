import BaseModel from "./BaseModel";

export class PlayListModel extends BaseModel {
    id: string
    User_id: string
    Genre_ID: string
    Type: string
    ImagePath: string
    PlayListName: string
    Likes: number
    Songs: number
    Duration: string
    Status: string
    Discripition: string
    constructor() {
        super()
        this.id = ""
        this.User_id = ""
        this.Genre_ID = ""
        this.Type = "nono"
        this.ImagePath = ""
        this.PlayListName = ""
        this.Likes = 0
        this.Songs = 0
        this.Duration = ""
        this.Status = ""
        this.Discripition = ""
    }
    setAll(d: any): void {
        super.setAll(d)

        this.ImagePath = this.ImagePath.indexOf("http") >= 0 ? this.ImagePath : `${this.ImagePath}`
    }
}

