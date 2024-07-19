import { handler } from './build/handler.js';
import express from 'express';
import * as fs from 'fs';
import * as http from 'http';

const app = express();

app.use(handler);

http.createServer(app).listen(3000, () => {
	console.log('https server is runing at port 3000');
});

app.get('/healthcheck', (req, res) => {
	res.end('ok');
});
