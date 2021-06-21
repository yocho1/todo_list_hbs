import asyncHandler from 'express-async-handler'
import List from '../models/listModel.js'
import { listValidation } from '../validation/listValidation.js'

//@desc  add List
//@route  POST /lists/add
//@access Public

const addList = asyncHandler(async (req, res) => {
  const { name } = req.body

  //Validate infos
  const { error } = listValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  const todoExists = await List.findOne({ name })

  if (todoExists) {
    res.status(400)
    throw new Error('List already exists')
  }

  const list = await List.create({
    name,
  })

  if (list) {
    res.status(201).json({
      _id: list._id,
      name: list.name,
    })
  } else {
    res.status(400)
    throw new Error('Invalid list data')
  }
})

//@desc  Fetch all lists
//@route  GET /lists
//@access Public

const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({})
  res.json(lists)
})

export { addList, getLists }
