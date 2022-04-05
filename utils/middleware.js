const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknow endpoint' })
}

const errorHanlde = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')

  if(authorization && authorization.startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if(request.token) {
    const decodedToekn = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToekn.id)
    if(user) {
      request.user = user
    }
  }

  next()
}

module.exports = {
  unknownEndPoint, errorHanlde, tokenExtractor, userExtractor
}