import { connect } from "@/db/db"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "user logged out successfully",
            success: true,
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })

        return response
    } catch (error: any) {
        return NextResponse.json({
            error: "something went wrong" + error.message,
        })
    }
}
