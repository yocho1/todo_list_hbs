import asyncHandler from 'express-async-handler'
import Todos from '../models/todosModel.js'
import { todoValidation } from '../validation/todoValidation.js'

//@desc  Fetch all todos
//@route  GET /todos
//@access Public

const getTodos = asyncHandler(async (req, res) => {
  // display all todos
  const todos = await Todos.find({}).populate('list', 'name')
  res.json(todos)
})

//@desc  add todo
//@route  POST /todos/add
//@access Public

const addTodos = asyncHandler(async (req, res) => {
  // Get todo infos
  const { title, list, isChecked } = req.body

  //Validate infos
  const { error } = todoValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  // check if the todo already exist
  const todoExists = await Todos.findOne({ title })

  if (todoExists) {
    res.status(400)
    throw new Error('todo already exists')
  }
  // save todo
  const todo = await Todos.create({
    title,
    list,
    isChecked,
  })

  if (todo) {
    res.status(201).json({
      _id: todo._id,
      title: todo.title,
      list: todo.list,
      done: todo.isChecked,
    })
  } else {
    res.status(400)
    throw new Error('Invalid todo data')
  }
})

//@desc  remove todo
//@route  POST /todos/add
//@access Public

const deleteTodo = asyncHandler(async (req, res) => {
  // find todo by id &  delete it
  await Todos.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      return res.status(404).send({ message: 'Cannot delete the Todo' })
    }
    res.status(201).send('Todo removed')
  })
})

//@desc  update todo
//@route  PUT /todos/add
//@access Public

const UpdateTodo = asyncHandler(async (req, res) => {
  // update the todo by using its Id
  const todo = await Todos.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    { new: true }
  )

  if (!todo) return res.status(400).send('the todo cannot be update!')

  res.send(todo)
})

//@desc  Archive todo
//@route  PUT /todos/done
//@access Public

const archiveTodo = asyncHandler(async (req, res) => {
  const todo = await Todos.findByIdAndUpdate(
    req.params.id,
    {
      isChecked: req.body.isChecked,
    },
    { new: true }
  )

  if (!todo) return res.status(400).send('the todo cannot be done!')

  res.send(todo)
})

export { getTodos, addTodos, deleteTodo, UpdateTodo, archiveTodo }
