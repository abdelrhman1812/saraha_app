import catchError from "../middleware/catchError.js";
import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";
import AppError from "../utils/appError.js";
import messages from "../utils/messages.js";

/* ============== Add Message ==============  */

const addmessage = catchError(async (req, res) => {
    const { content, receiverId } = req.body

    /* Prepare Message */

    const message = new MessageModel({

        content,
        receiverId
    });
    /* Creat and Save Message */

    const createdMessage = await message.save()
    res.status(201).json({ message: messages.message.successAdd, data: createdMessage })
})

const getMessage = catchError(async (req, res, next) => {

    const userId = req.authUser._id
    console.log(userId)

    const user = await UserModel.findById(userId)
    console.log(user)

    if (!user) return next(new AppError(messages.user.notFound), 404)

    const userMessages = await MessageModel.find({ receiverId: user._id })
    console.log(userMessages)


    res.status(200).json({ message: messages.message.success, message: userMessages })




})


/* ============== Delet Message ==============  */

const deleteMessege = catchError(async (req, res, next) => {
    const messageId = req.params.id
    const userId = req.authUser._id

    const message = await MessageModel.findById(messageId)
    if (!message) return next(new AppError(messages.message.notFound));

    /* Find Check Owner */

    const ownerUser = await UserModel.findById(userId)
    if (!ownerUser) return next(new AppError(messages.user.notFound), 404)

    if (message.receiverId.toString() !== ownerUser._id.toString()) {
        return next(new AppError(messages.message.ownerDeleted), 403);
    }

    /* Delete Message */

    await MessageModel.findByIdAndDelete(messageId)


    res.status(200).json({ message: messages.message.successDeleted })
})
export { addmessage, deleteMessege, getMessage };

