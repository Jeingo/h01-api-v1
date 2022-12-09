import express from 'express'
import {videosRouter} from "./routers/videos-router"
import {testRouter} from "./routers/test-router"

export const app = express()
const PORT = process.env.PORT || 5000

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    NOT_FOUND_404: 404,
    BAD_REQUEST_400: 400
}

export const db = {
    videos: [
        {
            id: 0,
            title: "Lesson 1",
            author: "Jeingo",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2022-12-09T17:58:07.464Z",
            publicationDate: "2022-12-09T17:58:07.464Z",
            availableResolutions: ["P144"]
        }
    ]
}

app.use(express.json())

app.use('/videos', videosRouter)

app.use('/testing/all-data', testRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

