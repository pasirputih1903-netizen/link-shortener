import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import linksRouter from './routes/links.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api', linksRouter)
app.use('/', linksRouter)

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`)
})