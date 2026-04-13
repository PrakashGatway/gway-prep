import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI) throw new Error("MONGODB_URI is not defined."); 

let cached = (global as any).mongoose ?? {conn : null , promise: null};
(global as any).mongoose = cached;
    
export async function connectDB() : Promise<typeof mongoose> {
    if(cached.conn) return cached.conn;

    cached.promise ??= mongoose.connect(MONGODB_URI,{
        bufferCommands : false
    });

    cached.conn = await cached.promise;

    return cached.conn;
}
