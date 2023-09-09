import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { random } from '../helpers';
import { authentication } from '../helpers';
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
       const user = await getUserByEmail(email).select('+authentication.password +authentication.salt');

        const expectedHash = authentication(user.authentication.salt, password);
        if (!user) {
            return res.sendStatus(404);
        }
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(401);
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('sessionToken', user.authentication.sessionToken, { domain: 'localhost', path: '/', httpOnly: true, secure: false, maxAge: 3600000 });
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        if(!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = random();
        const user = await createUser({ email, username, authentication: {salt, password: authentication(salt, password) } });
        return res.status(201).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}