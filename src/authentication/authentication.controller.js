import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import AppError from "../utils/appError.js";
import messages from "../utils/messages.js";


/* ========= Register Create Account =========  */

const register = async (req, res, next) => {

    const { userName, email, password } = req.body

    /* Check If Email Exist Or No */

    const emailExist = await UserModel.findOne({ email })

    if (emailExist) return next(new AppError(messages.email.emailIsExist), 409)

    /* Hash Password */

    const passwordHashing = bcrypt.hashSync(password, 10)

    /* prepare user */

    const user = new UserModel({
        userName,
        email,
        password: passwordHashing
    })

    /* Create User In db */
    const createdUser = await user.save()

    /* Send Email To Verfiy Account */

    sendEmails(email, token);

    res.status(200).json({ message: messages.user.createAccount, user: createdUser, success: true, verify: "Check Email And Verify Your Account" })



}



/* ========= Verify  Account =========  */

const verifyAccount = async (req, res, next) => {

    const { token } = req.params


    jwt.verify(token, "ody", async (err, payload) => {
        if (err) return next(new AppError("Invalid token", 401));

        await UserModel.findOneAndUpdate({ email: payload.email }, { confirmEmail: true })

        res.status(200).json({ message: messages.email.successVerifyAccount, email: payload.email })
    })


}


/* ========= Log In =========  */

const logIn = async (req, res, next) => {

    const { email, password } = req.body

    /* Check Email And Verify Account */

    const user = await UserModel.findOne({ email })

    if (!user) return next(new AppError(messages.email.emailIsNotExist), 404)

    if (user && user.confirmEmail == false) return next(new AppError(messages.email.faildVerifyAccount), 401)

    /* Check Password */

    const matchPassword = bcrypt.compareSync(password, user.password)

    if (!matchPassword) return next(new AppError(messages.password.incorrectPassword), 401)



    /* Generate Token */

    const token = jwt.sign({ userId: user._id, email: user.email, neme: user.userName },
        "ody",
        async (err, token) => {
            if (err) next(new AppError(messages.token.invalidToken), 401)
            return res.status(200).json({ message: messages.user.successLogin, token, user: user })
        });

}



export { logIn, register, verifyAccount };

