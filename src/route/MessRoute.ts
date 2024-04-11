import { Router } from "express";
import messController from "../controller/MessController";


const MessRoute = Router()

MessRoute.post("/GetAllMessInbox", messController.GetAllMessInbox)
MessRoute.post("/send", messController.SendMess)
MessRoute.post("/hiddenMess", messController.HiddenMess)
MessRoute.post("/remove", messController.Remove)
export default MessRoute