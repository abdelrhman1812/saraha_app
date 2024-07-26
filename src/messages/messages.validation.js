import Joi from "joi"

const messageValidaion = Joi.object({
    content: Joi.string().min(3).max(200).required(),
    receiverId: Joi.string().required(),
})

export default messageValidaion