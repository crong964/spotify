import BaseModel from "./BaseModel";

export default class TabModel extends BaseModel {
    id: string
    nameTab: string
    constructor() {
        super()
        this.id = ""
        this.nameTab = ""
    }
}

