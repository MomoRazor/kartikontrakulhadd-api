import { API_KEY } from '../env';

export interface IAccessSvc {
    checkAPIKey: (key: string) => boolean;
}

// Service
export const AccessSvc = (): IAccessSvc => {
    const checkAPIKey = (key: string) => {
        return key === API_KEY;
    };

    return {
        checkAPIKey
    };
};
