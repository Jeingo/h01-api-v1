import express from 'express'
import {videosRouter} from "./routers/videos-router";

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/videos', videosRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

