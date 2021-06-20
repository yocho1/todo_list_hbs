import asyncHandler from 'express-async-handler'
import Todos from '../models/todosModel.js'
import { todoValidation } from '../validation/todoValidation.js'

//@desc  Fetch all todos
//@route  GET /todos
//@access Public

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todos.find({})
  res.json(todos)
})

//@desc  add todo
//@route  POST /todos/add
//@access Public

const addTodos = asyncHandler(async (req, res) => {
  const { title } = req.body

  //Validate infos
  const { error } = todoValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  const todoExists = await Todos.findOne({ title })

  if (todoExists) {
    res.status(400)
    throw new Error('todo already exists')
  }

  const todo = await Todos.create({
    title,
  })

  if (todo) {
    res.status(201).json({
      _id: todo._id,
      title: todo.title,
    })
  } else {
    res.status(400)
    throw new Error('Invalid todo data')
  }
})

export { getTodos, addTodos }
