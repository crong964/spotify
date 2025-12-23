import { Router } from "express";

import playListLikeController from "../controller/PlayListLikeController";
import { CHECKAPI } from "../middleware/admin";

const PlayListLikeRoute = Router();
PlayListLikeRoute.use(CHECKAPI);
PlayListLikeRoute.post("/add", playListLikeController.Add);
PlayListLikeRoute.post("/delete", playListLikeController.Delete);
PlayListLikeRoute.post("/getall", playListLikeController.GetAll);
export default PlayListLikeRoute;
