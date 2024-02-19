import { UserDao } from "../dao/userDao";
import bcrypt from 'bcrypt';
import TokenService from "../services/token";
import { UserInterface } from "../models/UserModel";

class ValidateCredentials {
    userDao: UserDao
    constructor (userDao:UserDao) {
        this.userDao = userDao
    }
    async validate (email:string, password:string) {
        try {
            const user = await this.userDao.getUserByEmail(email)
            if (!user) throw new Error(`Usuario o contrseña inválidos`)
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) throw new Error(`Usuario o contrseña inválidos`)

            return true

        } catch (error:any) {
            throw new Error(`${error.message}`)
        }
    }
}

class RegisterUserInteractor {
    userDao: UserDao;
    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }
    async register(name:string, lastName:string, email:string, password:string): Promise<{user:UserInterface, token:string}> {
        try {
            if (!name || !lastName || !email || !password) {
                throw new Error('Todos los campos son obligatorios')
            }
            const emailExists = await this.userDao.emailAlreadyExists(email);
            if (emailExists) {
                throw new Error(`el correo electrónico ya existe: ${email}`);
            }
            const newUser = {
                name,
                lastName,
                email,
                password
            };
            const savedUser = await this.userDao.createUser(newUser);
            const token = TokenService.createToken(savedUser._id)
            return {user:savedUser, token};
        } catch (error:any) {
            throw new Error(`${error.message}`);
        }
    }
}

export {ValidateCredentials, RegisterUserInteractor}