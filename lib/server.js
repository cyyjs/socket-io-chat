const port = process.env.PORT || 6001

const server = require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html' })
  res.write(`<h1>PORT: ${port}</h1>`)
  res.end('<p>test</p>')
})

const redisAdapter = require('socket.io-redis')

const io = require('socket.io')(server, {
  path: '/chat',
  serveClient: true,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }))

io.on('connect', (socket) => {
  socket.on('msg', data => {
    socket.broadcast.emit('msg', { ...data, port })
  })

  socket.on('disconnect', (reason) => {
    // ...
    console.log('disconnect')
  })
})

server.listen(port, '0.0.0.0')
console.log('listen 0.0.0.0:' + port)
