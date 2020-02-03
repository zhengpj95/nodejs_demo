
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb://localhost:27017/mytest', { useNewUrlParser: true })

const Schema = mongoose.Schema

const rootSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  resume: {
    type: String
  }
})

module.exports = mongoose.model('Root', rootSchema)
