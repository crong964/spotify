import { Router, Request, Response } from "express";
import streamingController from "../controller/StreamingController";

const StreamingRoute = Router()

StreamingRoute.post("/s", streamingController.StreamingMusicUpload2)
StreamingRoute.post("/getinitsong", streamingController.GetInitSong)
StreamingRoute.post("/streaming2", streamingController.Streaming3)
export default StreamingRoute