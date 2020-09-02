const mongoose = require('mongoose');
const connection = mongoose.connection;
mongoose.connect('mongodb://localhost:/mytest', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

connection.on('open', () => {
	console.log(`mongoose connection is opend.`);
});

const PersonScheme = new mongoose.Schema({
	name: String,
	age: Number,
	gender: Number,
	hobbies: String,
});

module.exports = mongoose.model('Persons', PersonScheme);
