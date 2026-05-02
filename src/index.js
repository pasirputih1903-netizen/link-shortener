import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import linksRouter from './routes/links.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, '../public')))

app.use('/api', linksRouter)
app.use('/', linksRouter)

export default app

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`)
})