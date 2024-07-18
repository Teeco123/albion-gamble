import { handler } from './build/handler.js';
import express from 'express';
import * as fs from 'fs';
import * as https from 'https';

const app = express();

const ssl = { key: fs.readFileSync('./build/key.pem'), cert: fs.readFileSync('./build/cert.pem') };

app.use(handler);

https.createServer(ssl, app).listen(3000, () => {
	console.log('https server is runing at port 3000');
});

app.get('/healthcheck', (req, res) => {
	res.end('ok');
});
