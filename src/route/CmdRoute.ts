import { Router } from "express";
import cmdController from "../controller/CmdController";
const CmdRoute = Router()


CmdRoute.post("/", cmdController.PostCommand)


export default CmdRoute