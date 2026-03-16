import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//configure CORS to allow requests from our frontend origin and include credentials (cookies)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//express.json() --> middleware to parse request body(JSON) into readable js objects
app.use(express.json({
    limit: "16kb"
}));

// express.urlencoded() --> middleware to parse request body(URL) into readable js objects
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

//to store static files like images, css, js etc. in public folder and serve them when requested
app.use(express.static("public"));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello")
});

export { app }; 