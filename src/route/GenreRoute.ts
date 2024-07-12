import express from "express";
import genreController from "../controller/GenreController";
import { join } from "path";

const GenreRoute = express()

GenreRoute.get("/GetAll", genreController.GetAll)//0k
GenreRoute.get("/GetLimitFloor", genreController.GetLimitFloor)//0k
GenreRoute.post("/:idParent", genreController.PostByGenre)//0k
export default GenreRoute