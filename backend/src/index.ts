import dotenv from 'dotenv';
import express, { Express } from 'express';
const path = require('path')
const fs = require('fs')

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

console.log(process.env)


// const { Client } = require('pg')
// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT ?? 5432,
// })
// client.connect(function(err:any) {
//   if (err) throw err;
//   console.log("Connected to Postgres!");
// });

// app.get('/api/files', async (req: Request, res: Response) => {
//   let response = await client.query('SELECT * FROM system_nodes')
//   res.send(response.rows);
// });

// app.get('/api/files/:id',async (req: Request, res: Response) => {
//   let response = await client.query("SELECT * FROM system_nodes WHERE id = $1", [req.params.id])
//   res.send(response.rows[0]);
// });

// app.get('/api/technologies', async (req: Request, res: Response) => {
//   let response = await client.query('SELECT * FROM technologies')
//   res.send(response.rows);
// });


// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/*', function(req,res) {
// 		res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });