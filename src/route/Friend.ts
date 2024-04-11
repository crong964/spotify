import { Router } from "express";
import haveListFriendController from "../controller/HaveListFriendController";
const FriendRoute = Router()



FriendRoute.post("/Request", haveListFriendController.AddFriendsRequset)
FriendRoute.post("/Reponse", haveListFriendController.GetRespond)
FriendRoute.post("/", haveListFriendController.GetAllFriend)
FriendRoute.post("/Cancenl", haveListFriendController.CancelRequst)
FriendRoute.post("/Accept", haveListFriendController.AcceptRequset)



export default FriendRoute