const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

wss.on('connection', (ws) => {
  console.log('ws: ', ws);
  const sendMessage = (data) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  }

  ws.on('message', sendMessage)
})
