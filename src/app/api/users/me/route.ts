import { connect } from "@/db/db"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getToken"
connect()

export async function POST(req: NextRequest) {
    const userId = getDataFromToken(req)
    const user = await User.findOne({ _id: userId }).select("-password")
    if (!user) return NextResponse.json({ error: "invalid token" })
    return NextResponse.json({ message: "user found", data: user })
}
