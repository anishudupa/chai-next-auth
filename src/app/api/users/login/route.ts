import { connect } from "@/db/db"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
connect()

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()
        if (!email || !password)
            return NextResponse.json(
                { error: "all feilds are required" },
                { status: 400 }
            )
        const user = await User.findOne({ email })
        if (!user)
            return NextResponse.json(
                { error: "user doesn't exist" },
                { status: 400 }
            )
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword)
            return NextResponse.json(
                { error: "check your credentials" },
                { status: 400 }
            )
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: process.env.TOKEN_EXPIRY,
        })

        const resposne = NextResponse.json({
            message: "logged in successfully",
            success: true,
        })
        resposne.cookies.set("token", token, {
            httpOnly: true,
        })

        return resposne
    } catch (error: any) {
        return NextResponse.json({
            error: "something went wrong " + error.message,
        })
    }
}
