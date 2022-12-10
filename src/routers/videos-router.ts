import {Router} from 'express'
import {db, HTTP_STATUSES} from "../index"

export const videosRouter = Router({})

const arrayAvailableResolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

function checkContainsResolutions(resolutions: any){
    for(let i = 0; i < resolutions.length; i++){
        if(arrayAvailableResolutions.indexOf(resolutions[i]) == -1) {
            return true
        }
    }
    return false
}

videosRouter.get('/', (req, res) => {
    res.status(HTTP_STATUSES.OK_200).json(db.videos)
})

videosRouter.post('/', (req, res) => {

    const err: any = {
        errorsMessages: []
    }

    if(!req.body.title) {
        err.errorsMessages.push({
            message: 'Title is empty',
            field: 'title'
        })
    } else  if (req.body.title.length > 40){
        err.errorsMessages.push({
            message: 'Title is more than allowed 40 characters',
            field: 'title'
        })
    }

    if(!req.body.author) {
        err.errorsMessages.push({
            message: 'Author is empty',
            field: 'author'
        })
    } else if (req.body.author.length > 20) {
        err.errorsMessages.push({
            message: 'Author is more than allowed 20 characters',
            field: 'author'
        })
    }

    if(checkContainsResolutions(req.body.availableResolutions)) {
        err.errorsMessages.push({
            message: 'Field availableResolutions has invalid data',
            field: 'availableResolutions'
        })
    }

    if(err.errorsMessages.length > 0) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json(err)
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
    const err: any = {
        errorsMessages: []
    }

    if(!req.body.title) {
        err.errorsMessages.push({
            message: 'Title is empty',
            field: 'title'
        })
    } else  if (req.body.title.length > 40){
        err.errorsMessages.push({
            message: 'Title is more than allowed 40 characters',
            field: 'title'
        })
    }

    if(!req.body.author) {
        err.errorsMessages.push({
            message: 'Author is empty',
            field: 'author'
        })
    } else if (req.body.author.length > 20) {
        err.errorsMessages.push({
            message: 'Author is more than allowed 20 characters',
            field: 'author'
        })
    }
    if(typeof (req.body.canBeDownloaded) !== 'boolean') {
        err.errorsMessages.push({
            message: 'Field canBeDownloaded is not boolean',
            field: 'canBeDownloaded'
        })
    }
    if(checkContainsResolutions(req.body.availableResolutions)) {
        err.errorsMessages.push({
            message: 'Field availableResolutions has invalid data',
            field: 'availableResolutions'
        })
    }
    if(+req.body.minAgeRestriction < 1 || +req.body.minAgeRestriction > 18) {
        err.errorsMessages.push({
            message: 'Field minAgeRestriction less than 1 and more than 18',
            field: 'minAgeRestriction'
        })
    }
    if(err.errorsMessages.length > 0) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json(err)
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