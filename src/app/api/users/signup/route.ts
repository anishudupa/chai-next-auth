import { connect } from "@/db/db"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { sendMail } from "@/helpers/mailer"
connect()

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json()
        const { username, email, password } = reqbody

        if (!email || !username || !password) {
            return NextResponse.json(
                { error: "all feilds are required" },
                { status: 400 }
            )
        }
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { error: "user already exists" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        let newUser = await User.create({
            email,
            username,
            password: hashedPassword,
        })
        newUser = await User.findById(newUser._id).select("-password")

        // send verification email
        // await sendMail({
        //     email,
        //     emailType: "VERIFY",
        //     userId: newUser._id,
        // })

        return NextResponse.json({
            message: "user registered successfully",
            success: true,
            newUser,
        })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
