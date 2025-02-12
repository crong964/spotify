import { Router } from "express";
import recentSongController from "../controller/RecentSongController";

const RecentSongRoute = Router()


RecentSongRoute.get("/", recentSongController.GetAllByidUser)//0k
RecentSongRoute.get("/listenAgain", recentSongController.ListenAgainByUserId)
RecentSongRoute.get("/getlistenAgain/:id", recentSongController.GetListenAgainById)



export default RecentSongRoute