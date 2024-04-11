import { Router } from "express";
import searchControll from "../controller/SearchControll";




const SearchRoute = Router()

SearchRoute.post("/", searchControll.SearchNameArtist)
SearchRoute.post("/user", searchControll.SearchName)

export default SearchRoute