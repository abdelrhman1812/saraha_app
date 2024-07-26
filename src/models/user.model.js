import mongoose from "mongoose";
import { status } from "../utils/enum.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: status.OFFLINE
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
