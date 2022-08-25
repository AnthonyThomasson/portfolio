import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
const { Client } = require('pg')
const path = require('path')
const fs = require('fs')

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect(function(err:any) {
  if (err) throw err;
  console.log("Connected to Postgres!");
});

app.get('/api/files', async (req: Request, res: Response) => {
  let response = await client.query('SELECT * FROM system_nodes')
  res.send(response.rows);
});

app.get('/api/files/:id',async (req: Request, res: Response) => {
  let response = await client.query("SELECT * FROM system_nodes WHERE id = $1", [req.params.id])
  res.send(response.rows[0]);
});

app.get('/api/technologies', async (req: Request, res: Response) => {
  let response = await client.query('SELECT * FROM technologies')
  res.send(response.rows);
});


app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', function(req,res) {
		res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});