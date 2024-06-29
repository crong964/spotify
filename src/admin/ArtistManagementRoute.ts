import { Router } from "express";
import artistManagementController from "../controller/ArtistManagementController";
import multer from "multer";
const ArtistManagementRoute = Router()

const memory = multer.memoryStorage()

const upload = multer({ storage: memory })
    .fields([{ name: "Banner", maxCount: 1 }, { name: "pathImage", maxCount: 1 }])

ArtistManagementRoute.post("/add", upload, artistManagementController.Add)
ArtistManagementRoute.post("/", artistManagementController.GetAll)
ArtistManagementRoute.post("/getWithout", artistManagementController.GetWithout)
ArtistManagementRoute.post("/Get", artistManagementController.Get)
ArtistManagementRoute.post("/VertifyArtist", artistManagementController.VertifyArtist)
ArtistManagementRoute.post("/update", upload, artistManagementController.Update)

export default ArtistManagementRoute