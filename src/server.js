
//Babel is a JavaScript compiler. 사이트 나중에 검색
import express from "express";

const PORT = 4000;

const app = express();

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening)



