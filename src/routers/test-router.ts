import {Router, Request, Response} from 'express'
import {HTTP_STATUSES} from "../index"
import {videosRepositories} from "../repositories/videos-repositories"

export const testRouter = Router({})

testRouter.delete('/', (req: Request, res: Response) => {
    videosRepositories.clearAll()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})