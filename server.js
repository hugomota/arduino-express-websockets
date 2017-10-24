const express    = require('express');
const app        = express();
const server     = require('http').createServer(app);
const io         = require('socket.io')(server);

const port = process.env.PORT || 8080;
var router = express.Router();

router.get('/do', function(req, res) {
    res.json({ note: 'do' });
});
router.get('/re', function(req, res) {
    res.json({ note: 're' });
});

app.use('/api', router);

server.listen(port);
console.log('listen ' + port);

io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});

io.on('connection', function(client) {  
	console.log('Client connected...');

client.on('join', function(data) {
 	console.log(data);
    client.emit('messages', 'Hello from server');
});
});