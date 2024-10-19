import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Initialise a cached variable to hold the cached connection with the database, we attempt to retrieve a mongoose proprety from the global object
let cached = (global as any).mongoose || { conn: null, promise: null };     // if we don't already have a mongoose cached connection we send it with an empty object. (global as any) is for typescript. The type "conn" doesn't correspond to mongoose so we indicate that we are reffering to the global type of mongoose that we specificly imported.

export const connectToDatabase = async () => {
    // This functions tries to find the cached connection
    
    // Checking if cached is already connected
    if (cached.conn) return cached.conn;                    // If the cached connection exist, it returns the cached connection

    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    // We either connect to an already existing connection or we create a new connection.
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'evently',
        bufferCommands: false,
    })

    cached.conn = await cached.promise;

    return cached.conn;
}

// Managing data base connection efficiently
// 
// Each invocation of a serverless function could result in a new connection to the database which
// is inefficient and can exhaust database ressources.
// If we weren't caching it, it would be creation new connections to the database but by caching our 
// connection or the promise of the connection all the subsequent invocations can reuse the existing
// connection if it's still open or just try to create a new one. It is much more efficient.