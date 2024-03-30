import { Router } from "express";
import userController from "../controller/UserController";


const UserRoute = Router()


UserRoute.get("/signin", userController.SignIn)
UserRoute.get("/", userController.Get)
UserRoute.get("/artist", userController.getAllArtist)
UserRoute.get("/artisepage/:artisepage", userController.getArtisePage)

export default UserRoute 