import { Router } from "express";
import likedSongController from "../controller/LikedSongController";
import { CHECKAPI } from "../middleware/admin";

const LikedSongRoute = Router();

LikedSongRoute.use(CHECKAPI);
LikedSongRoute.get(
  "/getall/:idartise",
  likedSongController.GetAllByIduserAndIdArtise
); //0k
LikedSongRoute.post("/add", likedSongController.Add); //0k
LikedSongRoute.post("/delete", likedSongController.Delete); //0k
LikedSongRoute.get("/likedsongs", likedSongController.GetAllLikedSong); //0k
LikedSongRoute.get("/pagination", likedSongController.GetSongsByPagination);

export default LikedSongRoute;
