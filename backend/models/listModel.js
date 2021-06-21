import mongoose from 'mongoose'

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const List = mongoose.model('List', listSchema)

export default List
