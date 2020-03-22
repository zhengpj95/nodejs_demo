const ws = require('nodejs-websocket');

const server = ws.createServer((conn) => {
	console.log('new connect');

	conn.on('text', function (str) {
		console.log(`Received ${str}`);
		// conn.sendText(`${str}!!!`);
		boardCast(str);
	})

	conn.on('close', function (code, reason) {
		console.log(`Connection closed.`);
	})

	conn.on('error', function (err) {
		console.log(err);
	})

	setTimeout(() => {
		conn.sendText('服务器主动发信息给客户端。。。');
	}, 5000);

	setTimeout(() => {
		updateInfo(conn, 'please update info...');
	}, 1000);

}).listen(`5050`, () => {
	console.log(`started server ws://127.0.0.1:5050`);
});

function boardCast(str) {
	server.connections.forEach((value) => {
		value.sendText(str);
	});
}

function updateInfo(conn, str) {
	conn.sendText(str)
}