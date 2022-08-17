import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

  const { Client } = require('pg')
  const client = new Client({
    user: 'user',
    host: 'db',
    database: 'portfolio',
    password: 'password',
    port: 5432,
  })
  client.connect(function(err:any) {
    if (err) throw err;
    console.log("Connected!");
  });



app.get('/api/files', async (req: Request, res: Response) => {
  let response = await client.query('SELECT * FROM system_nodes')
  res.send(response.rows);
});

app.get('/api/files/:id', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/api/technologies', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});