// Define a user schema

import { model, models, Schema } from "mongoose";

// Define the schema of the User in the database
const UserSchema = new Schema({
    clerkId : { type: String, required: true, unique: true },    // Connection from Clerk authentification and the database user
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true},
})

// Either get the already existing model or create a new model by using a schema
const User = models.User || model('User', UserSchema);

export default User;