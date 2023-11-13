import "dotenv/config";
import express from 'express';
import path from 'path';
import { bodyParser, cors, contentType } from '../middleware/index';
import { routeUser } from '../routes/user';

export class App{
    public server;
    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
    }

    public middleware() {
        this.server.use(bodyParser)
        this.server.use(cors)
        this.server.use(contentType)
    }

    private routes() {
        this.server.use(routeUser);
        this.server.use("/video",express.static(path.resolve(__dirname,"..","..","..","shared","uploads")));
    }
}
export default new App().server;