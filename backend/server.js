import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//Call environnement variables config file
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import todosRoutes from './routes/todosRoutes.js'
import listRoutes from './routes/listRoutes.js'

//Execute function to connect the database
connectDB()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use('/users', userRoutes)
app.use('/todos', todosRoutes)
app.use('/lists', listRoutes)

// not found
app.use(notFound)
// error Handler
app.use(errorHandler)

//Select the PORT
const PORT = process.env.PORT || 3000

// start our app todos
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode en port ${PORT}`.yellow.bold
  )
)
