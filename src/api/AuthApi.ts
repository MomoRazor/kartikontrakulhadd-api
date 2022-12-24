import { Express } from 'express'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../env'
import { DecodedIdToken } from '../util'

export const AuthApi = async (app: Express, path: string = `*`) => {
    app.use(path, async (req, res, next) => {
        try {
            const { headers } = req

            const token = headers['x-token']?.toString()

            if (!token) {
                return res.status(401).send('Header x-token is required!')
            }

            const userData: DecodedIdToken = JSON.parse(
                JSON.stringify(verify(token, JWT_SECRET))
            )

            res.locals.firebaseUser = userData

            return next()
        } catch (e) {
            return next(e)
        }
    })
}
