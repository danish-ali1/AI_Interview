import mongoose from 'mongoose';

const connectDb= async()=>{
    try {
        const mongo=process.env.MONGO_URI
        const conn=await mongoose.connect(mongo)
        console.log(`MongoDB connected:${conn.connection.host}`)
    } catch (error) {
        console.error(`Error in mongo connection:${error.message}`)
    }
}

export default connectDb;