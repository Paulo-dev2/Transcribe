import { Router } from "express";
import { adaptRoute } from "../../../adapters/express-route-adapter";
import { makeDownloadVideoController } from "../factories/download-video";
import { makeViewDownloadsVideosController } from "../factories/get-videos";
import { makeViewVideoByIdController } from "../factories/get-video-by-id";
import { makeDeleteVideoByIdController } from "../factories/delete-video-by-id";
const routeUser = Router();

routeUser.post("/video/create-video",
    adaptRoute.create(makeDownloadVideoController())
);

routeUser.get("/video/get-videos",
    adaptRoute.create(makeViewDownloadsVideosController())
);

routeUser.get("/video/get-video/:id",
    adaptRoute.create(makeViewVideoByIdController())
);

routeUser.post("/video/delete-video",
    adaptRoute.create(makeDeleteVideoByIdController())
);

export {routeUser};
