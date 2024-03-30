import express from "express";
import genreController from "../controller/GenreController";
import { join } from "path";

const GenreRoute = express()

GenreRoute.get("/", (req, res) => {
    res.sendFile(join(process.cwd(), "web/admin.html"))
})
GenreRoute.get("/GetAll", genreController.GetAll)
GenreRoute.post("/Add", genreController.Add)
GenreRoute.post("/UpdateName", genreController.UpdateName)
GenreRoute.post("/Delete",genreController.Delete)

export default GenreRoute