
//Babel is a JavaScript compiler. 사이트 나중에 검색
import express from "express";
import morgan from "morgan";
import globalRouter from "./globalRouter";
import userRouter from "./userRouter";
import videoRouter from "./videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.use(logger);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);



