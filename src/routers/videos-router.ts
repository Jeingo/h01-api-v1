import {Router, Request, Response} from 'express'
import {HTTP_STATUSES} from "../index"
import {videosRepositories} from "../repositories/videos-repositories"
import {
    authorValidation,
    availableResolutionsValidation,
    inputValidationMiddleware,
    titleValidation
} from "../middlewares/input-validation-middleware"

export const videosRouter = Router({})

const arrayAvailableResolutions : Array<string> = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

function checkContainsResolutions(resolutions: Array<string>){
    for(let i = 0; i < resolutions.length; i++){
        if(arrayAvailableResolutions.indexOf(resolutions[i]) == -1) {
            return true
        }
    }
    return false
}

videosRouter.get('/', (req: Request, res: Response) => {
    const allVideos = videosRepositories.getAllVideos()
    res.status(HTTP_STATUSES.OK_200).json(allVideos)
})

videosRouter.post('/',
    titleValidation,
    authorValidation,
    availableResolutionsValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {

    const createdVideo = videosRepositories.createVideo(req.body.title, req.body.author, req.body.availableResolutions)
    res.status(HTTP_STATUSES.CREATED_201).json(createdVideo)
})

videosRouter.get('/:id', (req: Request, res: Response) => {

    const foundVideo = videosRepositories.getVideoById(+req.params.id)

    if(!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.json(foundVideo)
})

videosRouter.put('/:id', (req: Request, res: Response) => {
    const foundVideo = videosRepositories.updateVideo(+req.params.id)

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
    if(typeof(req.body.publicationDate) !== 'string') {
        err.errorsMessages.push({
            message: 'Field publicationDate should be sting type',
            field: 'publicationDate'
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

videosRouter.delete('/:id', (req: Request, res: Response) => {

    const foundVideo = videosRepositories.deleteVideo(+req.params.id)

    if(!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})