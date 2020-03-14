const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

// 保存路径
let filePath = path.resolve('./public');
// 文件路径
let xlsxData = xlsx.parse('./public/test.xlsx');
// xlsxData 数据 [ { name: 'sheet', data:[Array], [Array], [Array], ... } ]

// xlsxData[0].name
let excelName = xlsxData[0].name;
// xlsxData[0].data
let excelObj = xlsxData[0].data;

function createObj() {
	let newName = excelObj[0];
	let nameLength = newName.length;
	let newData = excelObj.slice(1);

	let result = {};	//对象
	// let result2 = [];	//数组

	let index = 0;
	for (let data of newData) {
		let obj = {};
		for (let i = 0; i < nameLength; i++) {
			obj[`${newName[i]}`] = data[i];
		}
		result[`${index}`] = obj;
		index++;
		// result2.push(obj);
	}

	return result;
}

let result = createObj();
console.log(result);

fs.writeFile(filePath + `/${excelName}.json`, JSON.stringify(result), function (err, data) {
	if (err) {
		console.log('error', err);
		return;
	}
	console.log(`The file has been saved!`);
});

fs.readFile(filePath + `/${excelName}.json`, (err, data) => {
	if (err) {
		throw err;
	}
	console.log(`读取的文件数据：`);
	console.log(JSON.parse(data));
});
