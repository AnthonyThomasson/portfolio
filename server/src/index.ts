import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import path from 'path'

dotenv.config()
const app: Express = express()
const port = process.env.PORT ?? 3000

const prisma = new PrismaClient()

app.get('/api/files', async (req: Request, res: Response) => {
    const files = await prisma.systemNode.findMany()
    res.send(files)
})

app.get('/api/files/:id', async (req: Request, res: Response) => {
    const file = await prisma.systemNode.findUnique({
        where: {
            id: Number(req.params.id),
        },
    })
    res.send(file)
})

app.get('/api/technologies', async (req: Request, res: Response) => {
    const technologies = await prisma.technology.findMany()
    res.send(technologies)
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
