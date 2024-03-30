import { Router } from "express";
import songController from "../controller/SongController";
const SongRoute = Router()
import multer from 'multer'
import { join } from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(process.cwd(), "/public/image"))
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`)
    }
})

const upload = multer({ storage: storage })
SongRoute.post("/Update", upload.single("avatar"), songController.Update)
SongRoute.post("/Upload", songController.Upload)
SongRoute.post("/SongList", songController.SongList)
SongRoute.post("/get", songController.GetSong)
SongRoute.post("/NewUpdate", upload.single("avatar"), songController.NewUpdate)
SongRoute.post("/newupload", songController.NewUpload)
SongRoute.post("/upStatus", songController.UpStatus)
SongRoute.get("/valisong/:idpage", songController.GetValidateAll)


//admin
SongRoute.post("/GetSongByGenre", songController.GetSongByGenre)
export default SongRoute