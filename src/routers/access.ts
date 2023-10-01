import { Router } from 'express';
import { IAccessSvc } from '../svc';

export const AccessRouter = (accessSvc: IAccessSvc) => {
    const router = Router();

    router.use(async (req, res, next) => {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                throw new Error('Authorization no found');
            }

            if (!(await accessSvc.checkAPIKey(authorization))) {
                throw new Error('Api Key does not match');
            }

            return next();
        } catch (e: any) {
            console.error(e);
            res.status(500).send(e);
        }
    });

    return router;
};
