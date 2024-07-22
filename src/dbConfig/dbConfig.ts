import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Set environment variables directly (for testing purposes)
process.env.TOKEN_SECRET = "Pely16XuPDWxEqe+GMKj6UeXDasKqIBJdu6T1j8FnVA=";
process.env.DOMAIN = "http://localhost:3000";
process.env.MONGO_URI = "mongodb+srv://shivangagarwal3165:b4LRAHbg5OQ8TTLt@cluster0.zjdltpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function connect(): Promise<void> {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error('MongoDB connection string is undefined. Please check your environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err: Error) => {
            console.error('MongoDB connection error. Please make sure MongoDB is running. ' + err.message);
            process.exit(1);
        });
    } catch (error) {
        console.error('Something went wrong!');
        console.error((error as Error).message);
        process.exit(1);
    }
}
