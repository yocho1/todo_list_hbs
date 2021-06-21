import mongoose from 'mongoose'

const todosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
})
const Todos = mongoose.model('Todos', todosSchema)

export default Todos
