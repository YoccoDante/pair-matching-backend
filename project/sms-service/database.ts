import mongoose from 'mongoose';
import { MONGO_DATA } from './mongo.config';

export const connectToDatabase = () => {
    mongoose.connect(MONGO_DATA.mongoURI)
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));
}