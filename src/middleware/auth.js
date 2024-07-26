import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { status } from "../utils/enum.js";
import messages from "../utils/messages.js";
import catchError from "./catchError.js";
const auth = catchError(async (req, res, next) => {

    const { token } = req.headers

    /* Check Token Is Exist */

    if (!token) return next(new AppError(messages.token.noTokenProvided), 404);

    /* Verfiy Token */

    const decode = jwt.verify(token, "ody")

    /* Check Decodede */

    if (!decode?.userId) return next(new AppError(messages.token.invalidToken), 400);

    const authUser = await UserModel.findById(decode?.userId);
    console.log(authUser)

    if (!authUser) return next(new AppError(messages.user.notFound), 404);

    /* Check If User Login or no */

    if (authUser.status == status.OFFLINE) return next(new AppError(messages.user.login));

    req.authUser = authUser

    next()
})

export default auth