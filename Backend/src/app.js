// express server code
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

// add all the middlewares

app.use(cors({
    origin: 'https://sap-new.vercel.app' || 'https://sap-new-srajanagrawals-projects.vercel.app' || 'http://localhost:5173' ,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())


// import all the routers here.
import userRouter from "./routes/user.routes.js"
import eventRouter from "./routes/events.routes.js"
import applyRouter from "./routes/events.routes.js"
import { mailSender } from "./utils/sendMail.js";


// routes middlewares information - version 1
app.use("/api/v1/user", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/apply", applyRouter);


export  {app};