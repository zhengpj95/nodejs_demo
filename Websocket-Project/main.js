const ws = require('nodejs-websocket');

const server = ws.createServer((conn) => {
	console.log('new connect');

	conn.on('text', function (str) {
		console.log(`Received ${str}`);
		conn.sendText(`${str}!!!`);
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

}).listen(`5050`, () => {
	console.log(`started server ws://127.0.0.1:5050`);
});