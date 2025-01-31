import { Router } from "express";
import playListController from "../controller/PlayListController";
import { USER } from "../config/admin";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage }).single("avatar")
const PlayListRoute = Router()


PlayListRoute.post("/GetAllPlayList", playListController.GetByGenreAdmin)//0k
PlayListRoute.get("/data/:idplaylist", playListController.GetPlayListById)//0k
PlayListRoute.post("/Nextplaylist", playListController.NextPlayListLimit)
PlayListRoute.post("/NextPlaylistArtist", playListController.NextPlayArtistListLimit)


PlayListRoute.post("/addplaylist", USER, playListController.Add)
PlayListRoute.post("/delete", USER, playListController.Delete)
PlayListRoute.post("/get", USER, playListController.GetByUserid)
PlayListRoute.post("/update", USER, upload, playListController.Update)
export default PlayListRoute