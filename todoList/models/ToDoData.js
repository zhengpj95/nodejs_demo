class ToDoData {
	uid;
	time;
	state;
	content;
}

const TodoState = {
	Not: 1, //未完成
	Finish: 2, //已完成
	Delete: 3, //已删除
};

module.exports.ToDoData = ToDoData;
module.exports.TodoState = TodoState;
