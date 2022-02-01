//Babel is a JavaScript compiler. 사이트 나중에 검색
import "./db";
import "./models/Video";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // my express Aplication
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleListening = () => 
    console.log(` Server listenting on http://localhost:${PORT} `);

app.listen(PORT, handleListening);



