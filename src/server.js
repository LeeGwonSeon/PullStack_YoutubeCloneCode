
//Babel is a JavaScript compiler. 사이트 나중에 검색
import express from "express";

const PORT = 4000;

const app = express();
const gossipMiddleware = (req, res, next) => {
    console.log(`Someone is going to: ${req.url}`);
    next();
}

const handleHome = (req, res) => {
    
    return res.send("I'm love middlewares");
}
const handleLogin = (req, res) => {
    return res.send({ message : "Login here!"});
}
app.get("/", gossipMiddleware, handleHome);
app.get("/login", handleLogin)

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening)



