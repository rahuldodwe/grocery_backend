import mongoose from "mongoose";

export const connectDB = async(uri)=>{
    try {
        await mongoose.connect(uri)
        console.log('====================================');
        console.log("DB CONNECTED");
        console.log('====================================');
    } catch (error) {
        console.log('====================================');
        console.log("uri : " ,uri);
        console.log("Database connection error: " ,error);
        console.log('====================================');
    }
}