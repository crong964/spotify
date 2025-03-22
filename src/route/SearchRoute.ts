import { NextFunction, Router, Request, Response } from "express";
import searchControll from "../controller/SearchControll";
const SearchRoute = Router()
const check = (key: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const name = req.body?.[key]
        if (name == undefined) {
            res.json({ err: true })
            return
        }
        next()
    }
}
SearchRoute.post("/", check("name"), searchControll.SearchNameArtistAndSong)//0k
SearchRoute.post("/user", check("name"), searchControll.SearchName)//0k
SearchRoute.post("/NameArtist", check("name"), searchControll.SearchNameArtist)
SearchRoute.post("/NameWithoutPlaylist", check("name"), searchControll.SearchSongNameWithoutPlaylist)
export default SearchRoute