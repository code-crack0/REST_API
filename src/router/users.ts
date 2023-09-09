import express from 'express';
import { getAllUsers } from '../controllers/users';
import { isAuthenticated,isOwner } from '../middlewares';
import { deletedUser,updateUser } from '../controllers/users';
export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deletedUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
}