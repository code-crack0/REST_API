import express from 'express';
import { getUserById, getUsers,deleteUser } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const deletedUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUserbyId = await deleteUser(id);
        return res.status(200).json(deletedUserbyId);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.sendStatus(400);
        }
        const updatedUser = await getUserById(id);
        if (!updatedUser) {
            return res.sendStatus(404);
        }
        updatedUser.username = username;
        await updatedUser.save();
        return res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}