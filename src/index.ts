import express from 'express'
import {videosRouter} from "./routers/videos-router"
import {testRouter} from "./routers/test-router"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {res.send('Test')})

app.use('/videos', videosRouter)

app.use('/testing/all-data', testRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

