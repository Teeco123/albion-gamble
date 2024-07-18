import { handler } from "./build/handler.js";
import express from "express";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";

const app = express();

const ssl = { key: fs.readFileSync("./build/key.pem"), cert: fs.readFileSync("./build/cert.pem") };

app.use(handler);

http.createServer(app).listen(3000, () => {
	console.log("http server is runing at port 3000");
});

https.createServer(ssl, app).listen(4000, () => {
	console.log("https server is runing at port 4000");
});

app.get("/healthcheck", (req, res) => {
	res.end("ok");
});
