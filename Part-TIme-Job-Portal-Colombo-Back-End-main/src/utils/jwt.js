import jwt from 'jsonwebtoken'
//import { JwT_SECRET } from '../config/env.js'
const JwT_SECRET= "1a466a6e3eeaaa0807167119e9a3092585d63b839da47151c2ac9aa592a16e26b873055ab7b989a31eab9066d9b9b4584319c4586adb5fcd3984e53c453bc7db"

export const generatedToken = (payload) => {
    if (!JwT_SECRET) {
        throw new Error('JwT_SECRET is not defined');
    }
    return jwt.sign(payload, JwT_SECRET, { expiresIn: '7d' });
}

export const verifyToken = (token) => {
    if (!JwT_SECRET) {
        throw new Error('JwT_SECRET is not defined');
    }
    return jwt.verify(token, JwT_SECRET)
};