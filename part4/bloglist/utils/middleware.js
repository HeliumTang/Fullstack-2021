const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  }

  logger.error(error.message)
  next(error)
}

const getAuthToken = (request) => {
  const header = request.get('Authorization') || ''
  const [bearer, token] = header.split(' ')
  return bearer === 'Bearer' && token ? token : null
}

const tokenExtractor = (request, response, next) => {
  const token = getAuthToken(request)
  request.token = token
  next()
}

const userExtractor = (request, response, next) => {
  const user = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
