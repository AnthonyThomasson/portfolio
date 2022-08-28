'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
var _a
Object.defineProperty(exports, '__esModule', { value: true })
const dotenv_1 = __importDefault(require('dotenv'))
const express_1 = __importDefault(require('express'))
const { Client } = require('pg')
const path = require('path')
const fs = require('fs')
dotenv_1.default.config()
const app = (0, express_1.default)()
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.ENVIRONMENT === 'development'
            ? false
            : {
                  rejectUnauthorized: false,
              },
})
client.connect(function (err) {
    if (err) throw err
    console.log('Connected to Postgres!')
})
app.get('/api/files', (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        let response = yield client.query('SELECT * FROM system_nodes')
        res.send(response.rows)
    })
)
app.get('/api/files/:id', (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        let response = yield client.query(
            'SELECT * FROM system_nodes WHERE id = $1',
            [req.params.id]
        )
        res.send(response.rows[0])
    })
)
app.get('/api/technologies', (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        let response = yield client.query('SELECT * FROM technologies')
        res.send(response.rows)
    })
)
app.use(express_1.default.static(path.join(__dirname, 'public')))
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.listen(port, () => {
    if (process.env.ENVIRONMENT === 'development') {
        console.log(
            `⚡️[server]: Server is running at http://localhost:${port}`
        )
    }
})
