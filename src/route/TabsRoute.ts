import { Router } from "express";
import tabsController from "../controller/TabsController";
import { CHECKAPI } from "../middleware/admin";
const TabsRoute = Router();
TabsRoute.use(CHECKAPI);
TabsRoute.get("/getall", tabsController.GetAll);

export default TabsRoute;
