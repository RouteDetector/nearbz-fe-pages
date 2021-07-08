import { getToken } from './storage';

export const isNewUser = () => {
    return getToken() == null;
}