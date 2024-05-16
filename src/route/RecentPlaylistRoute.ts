import { Router } from "express";
import recentPlaylistController from "../controller/RecentPlaylistController";

const RecentPlaylistRoute = Router()

RecentPlaylistRoute.post("/play", recentPlaylistController.Play)
RecentPlaylistRoute.post("/getAll", recentPlaylistController.GetAllByIdUser)
export default RecentPlaylistRoute