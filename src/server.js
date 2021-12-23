
//Babel is a JavaScript compiler. 사이트 나중에 검색
import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handleEditUser);

const handleWatchVideo = (req, res) => res.send("Watch Video");

const videoRouter = express.Router();

videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);



