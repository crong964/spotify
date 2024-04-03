import express from "express";
import genreController from "../controller/GenreController";
import { join } from "path";

const GenreRoute = express()

GenreRoute.get("/GetAll", genreController.GetAll)
GenreRoute.get("/GetLimitFloor", genreController.GetLimitFloor)
GenreRoute.get("/:idParent", genreController.GetByGenre)
export default GenreRoute