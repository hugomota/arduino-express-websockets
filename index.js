import socketIo from 'socket.io'
import express from 'express'
import http from 'http'

const app    = express()
const server = http.createServer(app)
const io     = socketIo(server)
const port   = 8080

app.get('/', (req, res) => res.send('The Server is Runing!'))

server.listen(port);
console.log('listen ' + port);

io.on('connection', socket => {
	console.log('Client connected...');
 	console.log(Object.keys(io.sockets.sockets));

	socket.on('newArduinoRead', function(data) {
		console.log('New Data Recieved');

		socket.broadcast.emit('newRead', data);
	});
});
