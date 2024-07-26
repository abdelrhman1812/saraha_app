import jwt from "jsonwebtoken";



const verfiyToken = async (req, res, next) => {

    const { token } = req.headers
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, "ody", async (err, decode) => {

        if (err) return res.status(401).json({ message: 'Invalid Token', err })

        req.user = decode // any req has a user
        next()

    })


}

export default verfiyToken