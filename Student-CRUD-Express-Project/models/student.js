/**
 * 学生模块文件
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb://localhost/mytest', {useNewUrlParser: true})

const studentSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  age: {
    type: Number,
  },
  hobbies: {
    type: String
  }
})

module.exports = mongoose.model('Students', studentSchema)
