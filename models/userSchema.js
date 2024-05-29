import mongoose from "mongoose";
import AuthRoles from "../services/AuthRoles.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
},
    {
        timestamps: true
    }
);


//encrypting the password
userSchema.pre("save", async function (next) {
    if (this.isModified(this.password)) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)

    next();
})

// predefined mongoose methods
userSchema.methods = {
    //compare password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },

    //Generate JWT Token
    createJwtToken: function () {
        return JWT.sign({ _id: this._id }, process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY || "30d"
            }
        )
    },

    //Generate forgot password token
    generateForgotPasswordToken: function () {
        const forgotToken = crypto.randomBytes(20).toString('hex');

        //save to database and send the same to user
        this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(forgotToken)
            .digest('hex')

        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

        //return same token to user
        return forgotToken;
    }
}

export default new mongoose.model("User", userSchema);