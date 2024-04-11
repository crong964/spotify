import { Router } from "express";
import boxController from "../controller/BoxController"

const BoxChatRoute = Router()

BoxChatRoute.post("/chat", boxController.Chat)
BoxChatRoute.post("/", boxController.GetAllBoxChat)
export default BoxChatRoute