import "dotenv/config";
import express from 'express';
import path from 'path';
import { bodyParser, cors, contentType } from '../middleware/index';
import { routeUser } from '../routes/user';
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
const WebSocket = require('ws');

export class App{
    public server;
    constructor() {
        this.server = express();
        this.database();
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
        this.server.use("/video",express.static(path.resolve(__dirname,"..","..","shared","uploads")));
    }

    private socket(server: any){
        const wss = new WebSocket.Server({ server });
        wss.on('connection', (ws: any) => console.log('Cliente conectado ao servidor WebSocket.', ws))
    }

    private database(){
        const url: any = process.env.DB_URI
        try {
            MongoHelper.connect(url)
                .then( async () => {
                    console.log("conectado")
                })
                .catch(console.error)
        } catch (error) {
            console.log(error)
        }
    }
}
export default new App().server;