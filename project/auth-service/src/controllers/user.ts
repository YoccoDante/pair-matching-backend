import { Request,Response } from "express";
import UserModel from "../models/UserModel";
import { UserDao } from "../dao/userDao";
import { GetUsersInteractor, GetUserByIdInteractor, DeleteUserInteractor } from "../useCases/user";

const getUsers = async (req: Request, res: Response) => {
    const { page, pageSize } = req.query;

    if (!page || !pageSize) {
        return res.status(400).json({ message: 'Both page and pageSize are required.' });
    }

    // Convert page and pageSize to numbers
    const pageNumber = Number(page);
    const size = Number(pageSize);

    if (isNaN(pageNumber) || isNaN(size)) {
        return res.status(400).json({ message: 'Both page and pageSize must be numbers.' });
    }

    try {
        const userDao = new UserDao(UserModel);
        const interactor = new GetUsersInteractor(userDao);
        const users = await interactor.getUsers({page:pageNumber, pageSize:size});

        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({ message: `${error.message}` });
    }
};

const getUserById = async (req:Request<any, any, {userId:string}>, res:Response) => {
    try {
        const {userId} = req.params
        const userDao = new UserDao(UserModel)
        const interactor = new GetUserByIdInteractor(userDao)
        const user = await interactor.getUser(userId)

        res.status(200).json(user)

    } catch (error:any) {
        res.status(400).json({ message: `${error.message}`} )
    }
}

const deleteUser = async (req:Request<any, any, {userId:string}>, res:Response) => {
    try {
        const {userId} = req.params
        const userDao = new UserDao(UserModel)
        const interactor = new DeleteUserInteractor(userDao)
        const user = await interactor.deleteUser(userId)

        res.status(200).json(user)

    } catch (error:any) {
        res.status(400).json({ message: `${error.message}`} )
    }
}

export {getUsers, getUserById, deleteUser}