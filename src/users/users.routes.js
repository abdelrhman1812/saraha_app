import { Router } from "express";
import checkEmail from "../middleware/checkEmail.js";
import validate from "../middleware/validation.js";
import verfiyToken from "../middleware/verifyToken.js";
import { getAllUsers, login, register, verifyEmail } from "./users.controller.js";
import { loginValidaion, registerValidaion } from "./users.validation.js";

const userRouter = Router()
userRouter.post('/auth/register', validate(registerValidaion), checkEmail, register)
userRouter.post('/auth/login', validate(loginValidaion), login)
userRouter.get('/', verfiyToken, getAllUsers)
userRouter.get('/verify/:token', verifyEmail)

export default userRouter