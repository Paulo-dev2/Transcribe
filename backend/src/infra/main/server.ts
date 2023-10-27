import app from "./config/app";
import "dotenv/config";

console.log(process.env.PORT )
app.listen(process.env.PORT);