import { NextFunction, Request, Response } from 'express';
import { SERVICE_PROVIDER_DOMAINS } from './enviornment';

export const bouncer = (req: Request, res: Response, next: NextFunction) => {
    if (SERVICE_PROVIDER_DOMAINS) {
        const verifiedDomains = SERVICE_PROVIDER_DOMAINS.split(',');
        console.log(verifiedDomains);
        console.log(req.get('host'));
        if (verifiedDomains.includes(req.get('host') || '')) {
            next();
        } else {
            res.status(401).end('Locked to specific Service Provider');
        }
    } else {
        next();
    }
};
