import { Router } from "express";
import artistManagementController from "../controller/ArtistManagementController";
import multer from "multer";
import path from "path";
const ArtistManagementRoute = Router()

const memory = multer.memoryStorage()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: memory })
    .fields([{ name: "Banner", maxCount: 1 }, { name: "pathImage", maxCount: 1 }])


const upload2 = multer({ storage: storage })
    .fields([{ name: "Banner", maxCount: 1 }, { name: "pathImage", maxCount: 1 }])

ArtistManagementRoute.post("/add", upload2, artistManagementController.Add2)
ArtistManagementRoute.post("/addQickly", artistManagementController.AddQickly)
ArtistManagementRoute.post("/", artistManagementController.GetAll)
ArtistManagementRoute.post("/getWithout", artistManagementController.GetWithout)
ArtistManagementRoute.post("/Get", artistManagementController.Get)
ArtistManagementRoute.post("/VertifyArtist", artistManagementController.VertifyArtist)
ArtistManagementRoute.post("/update", upload2, artistManagementController.Update)
ArtistManagementRoute.post("/delete", artistManagementController.Delete)
export default ArtistManagementRoute