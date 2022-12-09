import {Router} from 'express'
import {db, HTTP_STATUSES} from "../index"


export const videosRouter = Router({})

videosRouter.get('/', (req, res) => {
    res.status(HTTP_STATUSES.OK_200).json(db.videos)
})

videosRouter.post('/', (req, res) => {

    if(!req.body.title) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: [{
                message: 'Title is empty',
                field: 'title'
            }]
        })
        return
    }
    if(req.body.title.length > 40) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: [{
                message: 'Title is more than allowed 40 characters',
                field: 'title'
            }]
        })
        return
    }
    if(!req.body.author) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: [{
                message: 'Author is empty',
                field: 'author'
            }]
        })
        return
    }
    if(req.body.author.length > 20) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: [{
                message: 'Author is more than allowed 20 characters',
                field: 'author'
            }]
        })
        return
    }

    const tmpTime = new Date()
    const timeCreate = tmpTime.toISOString()
    const timePub = new Date(tmpTime.setDate((tmpTime.getDate() + 1))).toISOString()

    const createdVideo = {
        id: +(tmpTime),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: timeCreate,
        publicationDate: timePub,
        availableResolutions: req.body.availableResolutions
    }

    db.videos.push(createdVideo)

    res.status(HTTP_STATUSES.CREATED_201).json(createdVideo)
})

videosRouter.get('/:id', (req, res) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.id)

    if(!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.json(foundVideo)
})

videosRouter.put('/:id', (req, res) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.id)

    if(!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    if(!req.body.title) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: [{
                message: 'Title is empty',
                field: 'title'
            }]
        })
        return
    }
    if(req.body.title.length > 40) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: [{
                message: 'Title is more than allowed 40 characters',
                field: 'title'
            }]
        })
        return
    }
    if(!req.body.author) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: [{
                message: 'Author is empty',
                field: 'author'
            }]
        })
        return
    }
    if(req.body.author.length > 20) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            errorsMessages: [{
                message: 'Author is more than allowed 20 characters',
                field: 'author'
            }]
        })
        return
    }

    foundVideo.title = req.body.title
    foundVideo.author = req.body.author
    foundVideo.canBeDownloaded = req.body.canBeDownloaded
    foundVideo.minAgeRestriction = req.body.minAgeRestriction
    foundVideo.publicationDate = req.body.publicationDate
    foundVideo.availableResolutions = req.body.availableResolutions
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

videosRouter.delete('/:id', (req, res) => {

    const foundVideo = db.videos.find(v => v.id === +req.params.id)

    if(!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    db.videos = db.videos.filter(v => v.id !== +req.params.id)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})