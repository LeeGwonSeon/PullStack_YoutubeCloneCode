import express from "express";
import {join} from "./controllers/userController";
import {trending} from "./controllers/videoController";


const globalRouter = express.Router();

globalRouter.get("/", join);
globalRouter.get("/join", trending);

export default globalRouter;