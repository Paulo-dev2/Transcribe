import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-route-adapter";
import { makeDownloadVideoController } from "../factories/video";
const routeUser = Router();

routeUser.post("/video/create-video",
    adaptRoute.create(makeDownloadVideoController())
);

export {routeUser};
