import express from 'express';
import { getUsers, getUserById, deleteUser } from '../controllers/user';
import authenticateToken from '../middleware/authenticateToken';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/id/:userId', getUserById);
userRouter.delete('/id/:userId', authenticateToken, deleteUser);

export { userRouter };