import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "please enter username"],
            unique: [true, "user already exists"],
        },
        email: {
            type: String,
            required: [true, "please enter email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "please enter a password"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },

        verifyToken: String,
        verifyTokenExpiry: Date,
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
    },
    { timestamps: true }
)

const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User
