import mongoose from "mongoose"
import { buffer } from "stream/consumers";
import dns from "node:dns/promises";    // fix for DNS resolution issue
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const MONGODB_URI = process.env.MONGODB_URI!

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached
}

// Temporary: test connection on import
connectDB().then(() => {
    console.log("🟢 DB Ready, readyState:", mongoose.connection.readyState)
}).catch((err) => {
    console.error("🔴 DB Failed:", err.message)
})

async function connectDB() {


    if (!MONGODB_URI) {
        throw new Error("Please define the MONOGDB_URI enviroment vairable inside process.env")
    }

    if (cached.conn) {
        return cached.conn
    }


    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
        console.log("✅ DB Connected:", mongoose.connection.readyState)
    } catch (e) {
        cached.promise = null
        console.error("❌ DB Connection Failed:  connection error not connected to MONGODB" )
        throw e;
    }

    return cached.conn;
}



export default connectDB;