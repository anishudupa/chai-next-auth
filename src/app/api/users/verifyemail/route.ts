import { connect } from "@/db/db"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json()
        const { token } = reqbody
        if (!token)
            return NextResponse.json({ message: "no token" }, { status: 400 })
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        })
        if (!user)
            return NextResponse.json(
                { error: "invalid token" },
                { status: 400 }
            )

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyToken = undefined

        await user.save()

        return NextResponse.json({
            message: "email verified successfully",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({
            error: `something went wrong- ${error.message}`,
        })
    }
}
