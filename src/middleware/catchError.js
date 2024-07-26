import AppError from "../utils/appError.js"

const catchError = (callback) => {
    return (req, res, next) => {
        callback(req, res, next).catch((err) => {
            return next(new AppError(err))

        })
    }
}
export default catchError