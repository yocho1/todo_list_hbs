import mongoose from 'mongoose'

const todosSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
})
const Todos = mongoose.model('Todos', todosSchema)

export default Todos
