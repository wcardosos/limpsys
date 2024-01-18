import express from 'express'
import { container } from 'tsyringe'
import { CustomerController } from './http/controllers/customer'

export const routes = express.Router()

const customerController = container.resolve(CustomerController)

routes.get('/', (request, response) => {
  return response.send('Welcome to limpsys API!')
})

/*
  É necessário criar a função de callback que recebe os parâmetros de requisição e resposta e passar para o controller por conta
  do tsyringe (lib utilizada para gerenciar a injeção de dependências da aplicação) não funcionar muito bem com o Express.
  
  Outra forma de resolver isso seria utilizando o bind, contudo achei que ficaria um pouco confuso dessa forma.

  Ex.: routes.get('/customers', customerController.index.bind(customerController))
*/
routes.get('/customers', (request, response) =>
  customerController.index(request, response),
)
