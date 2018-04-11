const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 3001 });
let allClients = {};

ws.on('connection', client => {
    let randColor = generateRandColor();
    let randId = generateRandId();
    client.on('message', data => {
        let clientData = { id: randId, color: randColor, message: data };
        ws.clients.forEach( client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                
                client.send(JSON.stringify(clientData));
            }
        });
    });
});


let generateRandColor = () => '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

let generateRandId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
