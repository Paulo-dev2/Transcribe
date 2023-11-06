import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-route-adapter";
import { makeDownloadVideoController } from "../factories/download-video";
import { makeViewDownloadsVideosController } from "../factories/get-videos";
const routeUser = Router();

routeUser.post("/video/create-video",
    adaptRoute.create(makeDownloadVideoController())
);

routeUser.get("/video/get-videos",
    adaptRoute.create(makeViewDownloadsVideosController())
);

export {routeUser};
