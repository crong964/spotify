import { Router } from "express";
import recentSongController from "../controller/RecentSongController";
import { CHECKAPI } from "../middleware/admin";

const RecentSongRoute = Router();

RecentSongRoute.use(CHECKAPI);
RecentSongRoute.get("/", recentSongController.GetAllByidUser); //0k
RecentSongRoute.get("/listenAgain", recentSongController.ListenAgainByUserId);
RecentSongRoute.get(
  "/getlistenAgain/:id",
  recentSongController.GetListenAgainById
);

export default RecentSongRoute;
