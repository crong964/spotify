import { NextFunction, Router, Request, Response } from "express";
import streamingController from "../controller/StreamingController";

const StreamingRoute = Router()

StreamingRoute.get("/idSong", streamingController.StreamingMusic)
StreamingRoute.get("/s", streamingController.StreamingMusicUpload)



export default StreamingRoute