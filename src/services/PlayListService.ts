import PlayListDatabase from "../database/PlayListDatabase"
import { PlayListModel } from "../model/PlayListModel"

export class PlayListService {
    playlist: PlayListDatabase
    constructor(playlist: PlayListDatabase) {
        this.playlist = playlist
    }
    async Add(d: PlayListModel) {
        var check = await this.playlist.Add(d)
        console.log(check);

        return check
    }
    async Get(id: string) {
        var check = await this.playlist.Get(id)
        var ls = this.SetLs(check)
        return ls.length > 0 ? ls[0] : undefined;
    }
    async GetByGenre(Genre_ID: string, s: number, f: number) {
        var ls = await this.playlist.GetByGenre(Genre_ID, s, f)
        return this.SetLs(ls)
    }
    async GetByUser_id(User_id: string) {
        var ls = await this.playlist.GetByUser_id(User_id)
        return this.SetLs(ls)
    }

    async Update(d: PlayListModel) {
        var check = await this.playlist.Update(d)
        return check
    }
    SetLs(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: PlayListModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new PlayListModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
}

var playListService: PlayListService = new PlayListService(new PlayListDatabase())

export default playListService