import { Router } from "express";
import songAdminController from "../controllerAdmin/SongAdminController";
import multer from "multer";

const SongAdminRoute = Router()

const memory = multer.memoryStorage()
const upload = multer({ storage: memory }).single("avatar")

SongAdminRoute.post("/", songAdminController.SongListAndInforArtist)
SongAdminRoute.post("/uploadfile", songAdminController.Upload)
SongAdminRoute.post("/infor", songAdminController.SongListAndInforArtist)
SongAdminRoute.post("/addSong", upload, songAdminController.Add)
SongAdminRoute.post("update", songAdminController.Update)
SongAdminRoute.post("/updateStatus", songAdminController.UpStatus)
SongAdminRoute.post("/delete", songAdminController.DeleteSong)

export default SongAdminRoute