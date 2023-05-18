import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
// import moment from "moment";
// import "moment-timezone";
// const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-D HH:m:s")
// moment().tz("Asia/Bangkok").format("YYYY-MM-D HH:m:s")

try {
    await db.authenticate();
    console.log('Database Connected...');
    // process.env.TZ = "Asia/Bangkok";
    // console.log(new Date().toString());
    // console.log(Datecurrent);
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, ()=> console.log('Server running at port 5000'));