const path = require('path');
const http = require('http');
const express = require('express')
const socketio = require('socket.io');

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

const io = socketio(server)


io.on('connection', (socket) => {
    console.log('a user connected');
})

server.listen(port, () => {
  console.log(`App running on ${port}`);
  console.log(`http://localhost:${port}`);
}) 