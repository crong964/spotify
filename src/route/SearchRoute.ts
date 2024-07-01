import { Router } from "express";
import searchControll from "../controller/SearchControll";




const SearchRoute = Router()

SearchRoute.post("/", searchControll.SearchNameArtistAndSong)//0k
SearchRoute.post("/user", searchControll.SearchName)//0k
SearchRoute.post("/NameArtist", searchControll.SearchNameArtist)
export default SearchRoute