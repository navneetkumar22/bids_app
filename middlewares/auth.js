import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";

//function to check if token is present
export const isLoggedIn = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        if (!token) {
            throw new Error("Not authorized to access this route")
        }

        //if token is present - verify it and set as req.user
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded._id)

        next();

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
};


export const customRole = (...roles) => {
    return (req, _res, next) => {

        if (!roles.includes(req.user.role)) {
            throw new Error("You are not allowed to access this route!")
        }

        next()
    }
}