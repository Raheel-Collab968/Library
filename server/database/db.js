import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_LIBRARY_MANAGMENT_SYSTEM"
    }).then(()=> {
        console.log(`Database connected succesfully`)
    }).catch(err=> {
        console.log('Error connecting to database', err);
    })
}