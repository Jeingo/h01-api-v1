import {Router} from 'express'
import {db, HTTP_STATUSES} from "../index"

export const testRouter = Router({})

testRouter.delete('/', (req, res) => {
    db.videos = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})