const WebSocket = require('ws');
require('dotenv').config();
const PORT = process.env.PORT; 

const wst = new WebSocket.Server({ port: PORT || 3000 });

let messages = {}

let newUser = username => {
    wst.clients.forEach(function each(client) {
        
        if (client.readyState === WebSocket.OPEN) {
            let json = {
                'Action': 'New User',
                'Username': username
            }

            client.send(JSON.stringify(json));
            
        }
    });
}

wst.on('connection', function connection(wss) {
    wss.on('message', function incoming(message) {
        if (message === 'KA') return wss.send('KA');
        else if (JSON.parse(message)['Action'] == 'Connection') return newUser(JSON.parse(message)['Username']);
        let lessThanFour = message.length < 1 ? true : false;

        ws.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN && !lessThanFour) client.send(message);
        });
    });
});
