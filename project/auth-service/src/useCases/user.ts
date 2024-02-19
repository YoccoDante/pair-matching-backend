import { UserDao } from "../dao/userDao";
import { GetUsersRequest } from "../dao/userDao";
import TokenService from "../services/token";

class GetUsersInteractor {
    userDao:UserDao;
    constructor (userDao:UserDao) {
        this.userDao = userDao
    }
    async getUsers({page, pageSize}: GetUsersRequest) {
        if (page === 0 || pageSize === 0) {
            throw new Error(`La página y el tamaño de página deben ser mayor o igual a 1`);
        }

        const users = await this.userDao.getUsers(page, pageSize);
        return users;
    }
}

class GetUserByIdInteractor {
    userDao: UserDao
    constructor (userDao:UserDao) {
        this.userDao = userDao
    }
    async getUser (userId:string) {
        const user = await this.userDao.getUserById(userId)
        return user
    }
}

class DeleteUserInteractor {
    userDao: UserDao
    constructor (userDao:UserDao) {
        this.userDao = userDao
    }
    async deleteUser (userId:string) {
        const user = await this.userDao.deleteUser(userId)
        return user
    }
}

export { GetUsersInteractor, GetUserByIdInteractor, DeleteUserInteractor };
