import { Model } from 'mongoose';
import { UserInterface } from '../models/UserModel';
import bcrypt from 'bcrypt';

export interface CreateUserRequest {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface GetUsersRequest {
    page:number,
    pageSize:number
}

export class UserDao {
    private userModel: Model<UserInterface>;

    constructor(userModel: Model<UserInterface>) {
        this.userModel = userModel;
    }

    async getUsers(page:number, pageSize:number) {
        try {
            const users = await this.userModel.find({})
            .select('-password')
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        return users;
        } catch (error:any) {
            throw new Error(`Imposible obtener usuarios ${error.message}`)
        }
    }

    async createUser({name, lastName, email, password}: CreateUserRequest): Promise<any> {
        try {
            const hasedPassword = await bcrypt.hash(password,10)
            const newUser = new this.userModel({name, lastName, email, password:hasedPassword});
            return await newUser.save();
        } catch (error: any) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    async getUserById(userId: string): Promise<any> {
        try {
            return await this.userModel.findById(userId);
        } catch (error: any) {
            throw new Error(`Error al obtener usuario por ID: ${error.message}`);
        }
    }

    async updateUser(userId: string, userData: any): Promise<any> {
        try {
            return await this.userModel.findByIdAndUpdate(userId, userData, { new: true });
        } catch (error: any) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    async deleteUser(userId: string): Promise<any> {
        try {
            return await this.userModel.findByIdAndDelete(userId);
        } catch (error: any) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

    async emailAlreadyExists(email:string):Promise<boolean> {
        try {
            const exists = await this.userModel.exists({email:email})
            return !!exists
        } catch (error: any) {
            throw new Error(`Error al comprobar email: ${error.message}`);
        }
    }

    async getUserByEmail(email:string) {
        try {
            const user = await this.userModel.findOne({email:email})
            return user
        } catch (error:any) {
            throw new Error(`Imposible validar usuario ${error.message}`)
        }
    }
}
