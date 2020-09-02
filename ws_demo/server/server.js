const WebSocket = require('ws');
const Persons = require('../models/person');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log(`server received: ${message}`);
		findPersonDatas(ws);
	});
	ws.send('server received data...');
});

function findPersonDatas(ws) {
	Persons.find({ name: /^person/ }, 'name age gender -_id', (err, data) => {
		if (err) {
			return;
		}
		console.log(data);
		if (ws) {
			ws.send(data.toString());
		}
	});
}
