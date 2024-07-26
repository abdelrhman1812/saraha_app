import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
});

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
