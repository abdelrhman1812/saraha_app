import UserModel from "../models/user.model.js"


const checkEmail = async (req, res, next) => {
    const { email } = req.body
    let user = await UserModel.findOne({ email: email })
    if (user) return res.status(409).json({ message: "email is exists" })
    next()
}

export default checkEmail