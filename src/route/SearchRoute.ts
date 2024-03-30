import { Router } from "express";
import searchControll from "../controller/SearchControll";




const SearchRoute = Router()

SearchRoute.post("/", searchControll.SearchName)

export default SearchRoute