import express from 'express'

export const routes = express.Router()

routes.get('/', (request, response) => {
  return response.send('Welcome to limpsys API!')
})
