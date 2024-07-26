import { Router } from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import verfiyToken from "../middleware/verifyToken.js";
import { addmessage, deleteMessege, getMessage } from "./messages.controller.js";
import messageValidaion from "./messages.validation.js";

const messageRouter = Router()

messageRouter.post('/', validate(messageValidaion), addmessage)
messageRouter.get('/', verfiyToken, auth, getMessage)
messageRouter.delete('/:id', verfiyToken, auth, deleteMessege)

export default messageRouter