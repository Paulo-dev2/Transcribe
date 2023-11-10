import { MongoHelper } from "../../domain/repositories/mongodb/helpers/mongo-helper";
import app from "./config/app";
import "dotenv/config";

const url: any = process.env.DB_URI
try {
    MongoHelper.connect(url)
        .then( async () => {
            console.log("conectado")
            app.listen(process.env.PORT);
        })
        .catch(console.error)
} catch (error) {
    console.log(error)
}