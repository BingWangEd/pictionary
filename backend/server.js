const http = require('http');
const socketIO = require('socket.io');

const PORT = 3030;

const server = http.createServer();
const io = socketIO(server);

io.on('connection', (client) => {
  console.log('User connected: '+ client.id);
  console.log(io.sockets.clients().name);
  console.log(io.sockets.clients().ids);

  client.on('error', function (error) {
    console.log(error);
  });
});

server.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`listening on port ${PORT}`);
});
