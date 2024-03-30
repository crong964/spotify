import {Router} from "express";
import likedSongController from "../controller/LikedSongController";

const LikedSongRoute = Router()

LikedSongRoute.get("/getall/:idartise", likedSongController.GetAll)
LikedSongRoute.post("/add", likedSongController.Add)
LikedSongRoute.post("/delete", likedSongController.Delete)
LikedSongRoute.get("/likedsongs", likedSongController.GetAllLikedSong)


export default LikedSongRoute