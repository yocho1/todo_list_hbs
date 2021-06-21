const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

exports.List = mongoose.model('List', listSchema)
