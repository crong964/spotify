import { Router } from "express";
import playListController from "../controller/PlayListController";


const PlayListRoute = Router()


PlayListRoute.post("/GetAllPlayList", playListController.GetByGenreAdmin)//0k
PlayListRoute.get("/data/:idplaylist", playListController.GetPlayListById)//0k
PlayListRoute.post("/Nextplaylist", playListController.NextPlayListLimit)
PlayListRoute.post("/NextPlaylistArtist", playListController.NextPlayArtistListLimit)

export default PlayListRoute