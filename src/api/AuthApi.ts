import { Express } from 'express';
import { verify } from 'jsonwebtoken';
import { RBAC_SECRET, API_KEY } from '../env';
import { DecodedIdToken } from '../util';

export const AuthApi = async (app: Express, path: string = `*`) => {
    app.use(path, async (req, res, next) => {
        try {
            const { headers } = req;

            if (RBAC_SECRET) {
                const token = headers['x-token']?.toString();

                if (!token) {
                    return res.status(401).send('Header x-token is required!');
                }

                const userData: DecodedIdToken = JSON.parse(
                    JSON.stringify(verify(token, RBAC_SECRET))
                );

                res.locals.firebaseUser = userData;
            } else if (API_KEY) {
                const apiKey = headers['x-api-key']?.toString();

                if (apiKey != API_KEY) {
                    return res.status(401).send('API Keys do not match');
                }
            } else {
                return res.status(500).send('No Gating Features in place!');
            }

            return next();
        } catch (e) {
            return next(e);
        }
    });
};
