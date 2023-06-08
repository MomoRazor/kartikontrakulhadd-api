import { Router } from 'express'
import { IAccessSvc } from '../svc'
import {
    customError,
    sendExpressError
} from '@sector-eleven-ltd/cosmos-lite'

export const AccessRouter = (accessSvc: IAccessSvc) => {
    const router = Router()

    router.use(async (req, res, next) => {
        try {
            const { authorization } = req.headers

            if (!authorization) {
                throw customError('Authorization not found', 403)
            }

            if(!await accessSvc.checkAPIKey(authorization)){
                throw customError('Api Key does not match', 403)

            }

            return next()
        } catch (e: any) {
            sendExpressError(res, e)
        }
    })

    return router
}