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
  isChecked: {
    type: Boolean,
    required: true,
    default: false,
  },
})
const Todos = mongoose.model('Todos', todosSchema)

export default Todos
