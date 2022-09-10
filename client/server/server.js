const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000

server.use(middlewares)
server.use(jsonServer.router('./data/nodes.json'))
server.use(
    jsonServer.rewriter({
        '/api/files': '/files',
    })
)
server.listen(port)
