import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/env';

export const generateJWT = (userId: string) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30h' });
}
