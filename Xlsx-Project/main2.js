const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

let filePath = path.resolve('./public/json');
let xlsxData = xlsx.parse('./public/test.xlsx');

function readXlsx() {
	for (let data of xlsxData) {
		let fileName = data.name;

		let listName = data.data[0];
		let sheetData = data.data.slice(1);

		// createObj(fileName, listName, sheetData);
		createObj2(fileName, listName, sheetData);
	}

}

/**
 * 对象数组
 */
function createObj(fileName, listName, sheetData) {
	let fileData = [];
	let len = listName.length;

	for (let data of sheetData) {
		let obj = {};
		for (let i = 0; i < len; i++) {
			obj[`${listName[i]}`] = data[i];
		}
		fileData.push(obj);
	}
	createFile(fileName, fileData);
	// console.log('fileName---', fileName, '\nfileData---', fileData);
}

/**
 * 对象的对象
 */
function createObj2(fileName, listName, sheetData) {
	let fileData = {};
	let len = listName.length;

	let index = 0;
	for (let data of sheetData) {
		let obj = {};
		for (let i = 0; i < len; i++) {
			obj[`${listName[i]}`] = data[i];
		}
		fileData[`${index}`] = obj;
		index++;
	}
	createFile(fileName, fileData);
	// console.log('fileName---', fileName, '\nfileData---', fileData);
}

function createFile(fileName, fileData) {
	fs.writeFile(filePath + `/${fileName}.json`, JSON.stringify(fileData), (err, data) => {
		if (err) {
			console.log('error', err);
			return;
		}
		console.log(`The file has been saved!`);
	});
}

readXlsx();