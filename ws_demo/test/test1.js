const Persons = require('../models/person');

// save 10 datas to mongodb
// for (let i = 0; i < 10; i++) {
// 	let per = new Persons({ name: 'person' + i + 1, age: 11 * i + 1, gender: 1, hobbies: 'basketball' });
// 	per.save((err, data) => {
// 		if (err) {
// 			return;
// 		}
// 		console.log(data);
// 	});
// }

Persons.find({}, 'name age gender hobbies -_id', (err, data) => {
	if (err) {
		return;
	}
	console.log(data);
});
