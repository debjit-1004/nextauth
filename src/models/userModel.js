import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide usernme"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"Please provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
        default: null,
    },
    forgotPasswordTokenExpiry:{
        type: Date,
        default: null,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    verificationTokenExpiry:{
        type: Date,
        default: null,
    }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;