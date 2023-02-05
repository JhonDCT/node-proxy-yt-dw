import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;
const api = process.env.API;

app.post('/download', async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) res.send({ error: 'not found url' });

    const http = await fetch(`${api}/download?url=${url}`);
    const data = await http.text();
    const path = data.replace('/files/', '');

    res.send({ path });
});

app.get('/download-file', async (req: Request, res: Response) => {
    const { name } = req.query;
    if (!name) res.send({ error: 'not found name' });

    const http = await fetch(`${api}/file?${name}`);
    const text = await http.text();

    const download = Buffer.from(text, 'base64');

    res.setHeader('Content-Type', 'audio/mpeg').setHeader('Content-Disposition', `attachment; filename="${name}"`).send(download);
});

app.listen(port, () => {
    console.log('server on port: ' + port);
});