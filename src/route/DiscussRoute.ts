import { Router } from "express";
import discussController from "../controller/DiscussController";


const DiscussRoute = Router()


DiscussRoute.post("/", discussController.GetMainDiscuss)
DiscussRoute.post("/ReplayList", discussController.GetReplayDiscuss)
DiscussRoute.post("/add", discussController.PostDisscus)
DiscussRoute.post("/replay", discussController.PostReplay)


DiscussRoute.post("/delete", discussController.Delete)

DiscussRoute.post





export default DiscussRoute