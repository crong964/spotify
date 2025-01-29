import { Router } from "express";
import tabsAdminController from "../controllerAdmin/TabsAdminController";

const TabRoute = Router()


TabRoute.post("/getall", tabsAdminController.GetAll)//0k
TabRoute.post("/add", tabsAdminController.Add)//0k



export default TabRoute