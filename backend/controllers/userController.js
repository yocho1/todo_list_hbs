import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import {
  userValidation,
  loginValidation,
} from '../validation/userValidation.js'

//@desc  Auth user & get token
//@route  POST /users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  //Get user infos
  const { username, password } = req.body

  //Validate infos
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  //Check if the username and match password
  const user = await User.findOne({ username })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid username or password')
  }
})
//@desc  Register a new User
//@route  POST /users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  // Get user infos
  const { username, password } = req.body

  //Validate infos
  const { error } = userValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  //Check if the username already exist
  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  //Save the user
  const user = await User.create({
    username,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export { authUser, registerUser }
