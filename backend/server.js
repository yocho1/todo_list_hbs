import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

// database connection
connectDB()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// not found
app.use(notFound)

// error Handler
app.use(errorHandler)

app.use('/', (req, res) => {
  res.json('todos')
})

// port
const PORT = process.env.PORT || 3000

// start our app todos
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode en port ${PORT}`.yellow.bold
  )
)
