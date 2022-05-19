import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

// 밑에 설정한 app은 ffmpeg 녹화 다운로드 할때 에러가 안나게 하는 설정부분
// HTML에서 헤더 부분에 설정하는 거와 같이 서버에서도 전체적으로 에러를 방지하기 위해서는 맨 위에 설정하는 게 기본 중에 기본
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
    });
    
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // my express Aplication
app.use(express.text());
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave:false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);
app.use("/convert", express.static("node_modules/@ffmpeg/core/dist"));


export default app;



