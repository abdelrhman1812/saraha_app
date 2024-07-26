import jwt from "jsonwebtoken";
import catchError from "../middleware/catchError.js";
import UserModel from "../models/user.model.js";
/* ============== Register ==============  */


const register = catchError(async (req, res) => {

    // if (req.body.password) {
    //     req.body.password = bcrypt.hashSync(req.body.password, 8)
    // }
    // const user = await UserModel.insertMany(req.body);
    // console.log(req.body.email)
    // // sendEmails(req.body.email)

    // user[0].password = undefined
    // res.status(201).json({ message: "Success", user });

})

const login = catchError(async (req, res) => {


    // const { email, password } = req.body

    // let user = await UserModel.findOne({ email: email })
    // if (!user) {
    //     return res.status(404).json({ message: messages.user.isNotExist })
    // }

    // const matchPassword = bcrypt.compareSync(password, user.password)
    // if (!matchPassword) {
    //     return res.status(400).json({ error: "Incorrect password" });
    // }

    // jwt.sign({ userId: user._id, name: user.userName },
    //     "ody",
    //     (err, token) => {
    //         res.status(200).json({ message: "success", token })

    //     }
    // )

})



/* ======================= Get All Users ======================== */

const getAllUsers = catchError(async (req, res) => {
    const users = await UserModel.find()
    res.status(200).json({ users })
})



const verifyEmail = async (req, res) => {

    jwt.verify(req.params.token, "ody", async (err, payload) => {
        if (err) return res.status(401).json({ err })
        await UserModel.findOneAndUpdate({ email: payload.email }, { confirmEmail: true })
        res.json({ message: "Success", email: payload.email })

    })
}

export { getAllUsers, login, register, verifyEmail };

