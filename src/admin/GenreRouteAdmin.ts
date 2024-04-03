import express from "express";
import genreController from "../controller/GenreController";
import { join } from "path";

const GenreRouteAdmin = express()

GenreRouteAdmin.get("/", (req, res) => {
    res.sendFile(join(process.cwd(), "web/admin.html"))
})
GenreRouteAdmin.post("/Add", genreController.Add)
GenreRouteAdmin.post("/UpdateName", genreController.UpdateName)
GenreRouteAdmin.post("/Delete",genreController.Delete)

export default GenreRouteAdmin