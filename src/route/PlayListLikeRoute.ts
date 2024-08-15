import { Router } from "express";

import playListLikeController from "../controller/PlayListLikeController";


const PlayListLikeRoute = Router()

PlayListLikeRoute.post("/add", playListLikeController.Add)
PlayListLikeRoute.post("/delete", playListLikeController.Delete)
PlayListLikeRoute.post("/getall", playListLikeController.GetAll)
export default PlayListLikeRoute