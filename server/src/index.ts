/* eslint-disable @typescript-eslint/typedef */
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import path from 'path'

dotenv.config()
const app: Express = express()
const port = process.env.PORT ?? 3000

const prisma = new PrismaClient()

app.get('/api/files', async (req: Request, res: Response) => {
    try {
        const files = await prisma.systemNode.findMany()
        res.send(files)
    } catch (e) {
        res.status(500)
    }
})

app.get('/api/files/:id', async (req: Request, res: Response) => {
    try {
        const file = await prisma.systemNode.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })
        res.send(file)
    } catch (e) {
        res.status(500)
    }
})

app.get('/api/technologies', async (req: Request, res: Response) => {
    try {
        const technologies = await prisma.technology.findMany()
        res.send(technologies)
    } catch (e) {
        res.status(500)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/files/*/:file', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'files', req.params.file))
})
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
