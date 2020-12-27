const path = require('path');
const fs = require('fs');
const express = require('express');
const { ToDoData, TodoState } = require('./models/ToDoData');
const app = express();
const port = 3000; //若改变，需要改变index.html中的路径

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

/**添加时间*/
app.get('/getDayList', (req, res) => {
	let list = fs.readFileSync('./db/list.json', 'utf-8');
	res.send(list);
});

app.get('/getToDoList', (req, res) => {
	console.log(req.url, req.query);
	let list = fs.readFileSync('./db/data.json', 'utf-8');
	if (!list) res.send('');
	let day = req.query['day'].split('.').join('-');
	let data = JSON.parse(list)[day];
	res.send(JSON.stringify(data));
});

app.get('/saveDay', (req, res) => {
	let list = fs.readFileSync('./db/list.json', 'utf-8');
	let key = getFullTime();
	let data = JSON.parse(list);
	if (!data[key]) {
		data[key] = key.split('-').join('.');
		fs.writeFileSync('./db/list.json', JSON.stringify(data));
		let obj = {
			key: `${key}`,
		};
		res.send(JSON.stringify(obj));
	} else {
		res.sendStatus(200);
	}
});

function getFullTime() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let key = `${year}-${month}-${day}`;
	return key;
}

function getFullTime2() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let h = date.getHours();
	let m = date.getMinutes();
	let s = date.getSeconds();
	let key = `${year}-${month}-${day} ${h}:${m}:${s}`;
	return key;
}

/**保存任务*/
app.get('/saveTask', (req, res) => {
	console.log(req.query);
	if (!req.query) return;
	let key = req.query['key'];
	let task = req.query['task'];

	let bigKey = getFullTime();
	let list = fs.readFileSync('./db/data.json', 'utf-8');
	let data = JSON.parse(list);

	if (!data[bigKey]) {
		data[bigKey] = {};
	}

	data[bigKey][key] = {
		uid: key,
		time: getFullTime2(),
		state: 1,
		content: task,
	};
	fs.writeFileSync('./db/data.json', JSON.stringify(data));
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
