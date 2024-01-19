import 'reflect-metadata'
import '../containers'
import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import { catchAllErrors } from './http/middlewares/catch-all-errors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(catchAllErrors)

app.listen(3333, () => {
  console.log('limpsys server is running!')
})
