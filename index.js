const WebSocket = require('ws');
require('dotenv').config();
const PORT = process.env.PORT; 

const ws = new WebSocket.Server({ port: PORT || 3000 });

let messages = {}



ws.on('connection', function connection(wss) {

    wss.on('message', function incoming(message) {
        
        let lessThanFour = message.length < 1 ? true : false;

        ws.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN && !lessThanFour) client.send(message);
        });
    });
});
