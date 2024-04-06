import { Router } from "express";
import notificationController from "../controller/NotificationController";

const NotificationRoute = Router()

NotificationRoute.post("/all", notificationController.GetAll)
NotificationRoute.post("/delete", notificationController.Delete)

export default NotificationRoute