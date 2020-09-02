const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
	ws.send('client ask for data...');
});

ws.on('close', () => {
	console.log(`server is closed or not open, so client have to close...`);
});

ws.on('error', (err) => {
	console.log(`connect to server error --- ${err}`);
});

ws.on('message', (data) => {
	console.log(`client received: ${data}...`);
});
