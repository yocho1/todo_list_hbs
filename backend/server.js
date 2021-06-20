import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
dotenv.config()


const app = express()

app.use(express.json())

app.use('/', (req, res)=>{
    res.json('todos')
})


const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode en port ${PORT}`.yellow.bold
  )
)