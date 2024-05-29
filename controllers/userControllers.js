import User from "../models/userSchema.js";
import crypto from "crypto";


/************************************************************** 
 * @SIGN_UP 
 * @Request_type POST
 * @Route /users/register
 * @description Register a new user
 * @parameters name, email, password
 * @returns Success message
 ***************************************************************/

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //check if all fields are provided
        if (!username || !email || !password) {
            throw new Error("All fields are required")
        }

        //check if user already exists
        const userExist = await User.findOne({ email })
        if (userExist) {
            throw new Error("User already exists")
        }


        //create the document
        const user = await User.create({ username, email, password })

        //create token
        const token = user.createJwtToken()

        //send response with the token
        res.status(200).json({
            success: true,
            message: "User created successfully"
        })


    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}


/************************************************************** 
 * @SIGN_IN
 * @Request_type POST
 * @Route /users/login
 * @description Login a user
 * @parameters email, password
 * @returns An auth token
 ***************************************************************/

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("All fields are required")
        }

        //check if user exists
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            throw new Error("Invalid Credentials")
        }

        //validate the entered password - if success, login
        const isPasswdCorrect = await user.comparePassword(password)
        if (isPasswdCorrect) {
            const token = user.createJwtToken()
            user.password = undefined

            return res.status(200).json({
                success: true,
                token
            })
        }

        throw new Error("Invalid credentials")

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}

/************************************************************** 
 * @Get_profile
 * @Request_type GET
 * @Route users/profile
 * @description check for token and populate req.user
 * @parameters auth token
 * @returns user object
 ***************************************************************/

export const profile = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            throw new Error("User not found")
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}


/************************************************************** 
 * @Forgot_password
 * @Request_type POST
 * @Route users/password/forgot
 * @description create forgotPasswordToken and send it back to user
 * @parameters user email to verify
 * @returns forgotPasswordToken
 ***************************************************************/

export const forgetPassword = async (req, res) => {

    const { email } = req.body;
    const user = await User.findOne({ email });

    try {

        const forgetToken = user.generateForgotPasswordToken();
        await user.save({ validateBeforeSave: false });

        //send this token to user

        res.status(200).json({
            success: true,
            message: "Token sent successfully",
            forgetToken
        })

    } catch (error) {
        //if anything goes wrong
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }

}


/************************************************************** 
 * @Reset_Password
 * @Request_type POST
 * @Route users/password/reset/:resetToken
 * @description User will be allowed to reset password
 * @parameters token from url, password and confirmPassword
 * @returns user object
 ***************************************************************/

export const resetPassword = async (req, res) => {
    const resetToken = req.params.resetToken;
    const { password, confirmPassword } = req.body;

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    //grab the user from database
    const user = await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
        throw new Error("Password token is invalid or expired")
    }

    if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password does not match")
    }

    //save user with new password
    user.password = password;
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    await user.save()

    //create token and send as response
    const token = user.createJwtToken()
    user.password = undefined

    res.status(200).json({
        success: true,
        token
    })

}