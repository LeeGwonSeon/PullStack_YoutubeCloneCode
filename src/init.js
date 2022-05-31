//Babel is a JavaScript compiler. 사이트 나중에 검색
import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";


const PORT = process.env.PORT || 4000;

const handleListening = () => 
    console.log(` Server listenting on http://localhost:${PORT} `);

app.listen(PORT, handleListening);
