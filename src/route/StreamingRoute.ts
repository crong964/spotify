import { Router, Request, Response } from "express";
import streamingController from "../controller/StreamingController";

const StreamingRoute = Router()

//StreamingRoute.get("/idSong", streamingController.StreamingMusic)
StreamingRoute.post("/s", streamingController.StreamingMusicUpload2)
//StreamingRoute.post("/streaming", streamingController.Streaming)
StreamingRoute.post("/getinitsong", streamingController.GetInitSong)
StreamingRoute.post("/streaming2", streamingController.Streaming2)
export default StreamingRoute