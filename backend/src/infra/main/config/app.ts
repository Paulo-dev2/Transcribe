import "dotenv/config";
import express from 'express';
import path from 'path';
import { bodyParser, cors, contentType } from '../middleware/index';
import http from 'http';
import { Server } from "socket.io";
import { routeUser } from '../routes/user';

/* Routes */


export class App{
    public server;
    public http: any = http;
    constructor() {
        this.server = express();
        //this.http = this.http.createServer(this.server);
        //this.socket(this.http);
        this.middleware();
        this.database();
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

    private database(){

    }

    private socket(server: any){
        // const io = require('socket.io')(server);
        // const videoYoutube = io.of('/'); 
        // console.log(videoYoutube)

        // videoYoutube.on('connection', (socket: any) => {
        //     console.log('Cliente conectado à rota de vídeo');
          
        //     socket.on('progress', (message: any) => {
        //         videoYoutube.emit('progress', message);

        //     });
        //   });

        const io = new Server(server, {
            cors: { origin: "*" },
        });

        io.off('connection', () => {
            console.log('Cliente conectado à rota de vídeo');
        });
    }

    public getServer(){
        return this.http;
    }
}
export default new App().server;