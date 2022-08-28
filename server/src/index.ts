import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import path from 'path'
import { Client } from 'pg'

dotenv.config()
const app: Express = express()
const port = process.env.PORT ?? 3000

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.ENVIRONMENT === 'development'
            ? false
            : {
                  rejectUnauthorized: false,
              },
})

client.connect(function (err: Error) {
    if (err) throw err
    console.log('Connected to Postgres!')
})

app.get('/api/files', async (req: Request, res: Response) => {
    const response = await client.query('SELECT * FROM system_nodes')
    res.send(response.rows)
})

app.get('/api/files/:id', async (req: Request, res: Response) => {
    const response = await client.query(
        'SELECT * FROM system_nodes WHERE id = $1',
        [req.params.id]
    )
    res.send(response.rows[0])
})

app.get('/api/technologies', async (req: Request, res: Response) => {
    const response = await client.query('SELECT * FROM technologies')
    res.send(response.rows)
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
    if (process.env.ENVIRONMENT === 'development') {
        console.log(
            `⚡️[server]: Server is running at http://localhost:${port}`
        )
    } else {
        console.log(
            `⚡️[server]: Server is running at https://localhost:${port}`
        )
    }
})
