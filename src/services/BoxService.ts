import BoxDatabase from "../database/BoxDatabase"
import BoxModel from "../model/BoxModel"

export class BoxService {
    data: BoxDatabase
    constructor(i: BoxDatabase) {
        this.data = i
    }
    async getAllBoxByIdUser(idUser: string) {
        var ls = await this.data.getAllBoxById(idUser)
        return this.setlsBox(ls)
    }
    async insertNewBox(idBox: string, type: "friend" | "nofriend" | "group") {
        var check = await this.data.insertNewBox(idBox, type)
        return check
    }

    private setlsBox(any: any) {
        var list: BoxModel[] = []
        if (any == undefined) {
            return []
        }

        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            var box = new BoxModel();
            box.setAll(element);
            list.push(box);
        }
        return list
    }
    async UpdateBoxType(idBox: string, type: string) {
        var check = await this.data.UpdateBoxType(idBox, type)
        return check
    }

    async UpdateLastMessBox(idUser: string, content: string, idBox: string, type: "mess" | "image" | "liveLocation" | "shareLocation") {
        var check
        check = await this.data.UpdateLastMessBox(idUser, content, idBox, type)
        return check
    }
    async GetBoxbyIdBox(idBox: string) {
        var box: BoxModel | undefined
        try {
            var ls = await this.data.GetBoxbyIdBox(idBox) as []
            for (let i = 0; i < ls.length; i++) {
                const element = ls[i];
                box = new BoxModel()
                box.setAll(element)
                break
            }
        } catch (error) {
            console.log(error);

        }
        return box;
    }
}


var boxService: BoxService = new BoxService(new BoxDatabase())

export default boxService