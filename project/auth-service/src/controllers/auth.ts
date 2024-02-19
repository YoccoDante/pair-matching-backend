import { Request, Response } from "express";
import { UserDao } from "../dao/userDao";
import UserModel from "../models/UserModel";
import { RegisterUserInteractor, ValidateCredentials } from "../useCases/auth";

const login = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body
        const userDao = new UserDao(UserModel)
        const interactor = new ValidateCredentials(userDao)

        const isValid = await interactor.validate(email, password)

        res.status(200).json({valid: isValid})

    } catch (error:any) {
        res.status(401).json({ message:`${error.message}` })
    }
}

const register = async (req:Request, res:Response) => {
    try {
        const userDao = new UserDao(UserModel)
        const interactor = new RegisterUserInteractor(userDao)
        const {name, lastName, email, password} = req.body
        const response = await interactor.register(name, lastName, email, password)

        res.status(201).json(response)

    } catch (error:any) {
        res.status(400).json({ message: `${error.message}` });
    }
}

export {login, register}