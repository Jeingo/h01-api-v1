import {Router} from 'express'
import {db, HTTP_STATUSES} from "../index"


export const videosRouter = Router({})

videosRouter.get('/', (req, res) => {
    res.status(HTTP_STATUSES.OK_200).json(db.videos)
})

videosRouter.post('/', (req, res) => {

})

videosRouter.get('/:id', (req, res) => {

})

videosRouter.put('/:id', (req, res) => {

})

videosRouter.delete('/:id', (req, res) => {

})