import { Router } from "express";
import messController from "../controller/MessController";
import multer from "multer";
import { join } from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(process.cwd(), '/public/upload'))
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`)
    }
})
const mutil = multer({
    storage: storage,
    limits: {
        fileSize: 10000000000
    },
    fileFilter(req, file, callback) {
        callback(null, true)
    },
}).array("image", 9)

const MessRoute = Router()

MessRoute.post("/GetAllMessInbox", messController.GetAllMessInbox)
MessRoute.post("/send", messController.SendMess)
MessRoute.post("/hiddenMess", messController.HiddenMess)
MessRoute.post("/remove", messController.Remove)
MessRoute.post("/image", mutil, messController.Image)
MessRoute.post("/NextMessList", messController.NextMessList)
export default MessRoute