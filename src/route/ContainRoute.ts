import { Router } from "express";
import containController from "../controller/ContainController"



const ContainRoute = Router()


ContainRoute.post("/addsong", containController.AddC)
ContainRoute.post("/deletesong", containController.DeleteC)

export default ContainRoute