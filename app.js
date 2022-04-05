const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

logger.info('Connecting to mongodb' + config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(err => {
    logger.error('error connecting to MongoDB: ' + err)
  })

app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/test')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHanlde)

module.exports = app