import {body, validationResult} from "express-validator"
import {NextFunction, Request, Response} from "express"

const baseValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            message: error.msg,
            field: error.param
        }
    }
})

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = baseValidationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errorsMessages: errors.array() })
    } else {
        next()
    }
}

const arrayAvailableResolutions : Array<string> = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

const checkContainsResolutions = (resolutions: Array<string>) => {
    for(let i = 0; i < resolutions.length; i++){
        if(arrayAvailableResolutions.indexOf(resolutions[i]) === -1) {
            throw new Error('Error')
        }
        return true
    }
}

export const titleValidation = body('title').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 40}).withMessage('Should be less than 40 symbols').bail()

export const authorValidation = body('author').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 20}).withMessage('Should be less than 20 symbols').bail()

export const availableResolutionsValidation = body('availableResolutions')
    .isArray().withMessage('Should be array').bail()
    .custom(checkContainsResolutions).withMessage('Should be contain available resolutions. Example ["P144", "P720"]').bail()