import asyncHandler from 'express-async-handler'
import Todos from '../models/todosModel.js'

//@desc  Fetch all todos
//@route  GET /todos
//@access Public

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todos.find({})
  res.json(todos)
})

export { getTodos }
