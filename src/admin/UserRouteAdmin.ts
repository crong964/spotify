import { Router } from "express";
import userController from "../controller/UserController";
const UserRouteAdmin = Router()


UserRouteAdmin.post("/userlist", userController.GetAllUserAdmin)

export default UserRouteAdmin