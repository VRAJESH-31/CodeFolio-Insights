import mongoose from 'mongoose';
import { MONGO_CONN, DB_NAME } from './config.js';

mongoose.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

mongoose.set('toObject', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGO_CONN}/${DB_NAME}`);
        console.log(`MongoDB Database Connected! Database Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Database Connection Error: ", error);
        process.exit(1);
    }
}

export {
    connectToDB,
}
