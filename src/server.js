
import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // my express Aplication

app.use(session({
    secret:"Hello!",
    resave:true,
    saveUninitialized: true,
})
);

app.use((req, res, next) =>{
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    })
});

app.get("/add-one", (req, res, next) =>{
    req.session.potato += 1;
    return res.send(`${req.session.id}\n${req.session.potato}`);
})


app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;


