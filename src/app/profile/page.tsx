"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
function Profile() {
    const [data, setData] = useState("nothing")
    const router = useRouter()
    const getUserDetails = async () => {
        try {
            const responose = await axios.post("/api/users/me")
            setData(responose.data.data._id)
            toast.success("got user details", {
                position: "top-center",
                duration: 1500,
            })
        } catch (error: any) {
            toast.error("something went wrong", {
                position: "top-center",
                duration: 1500,
            })
        }
    }

    const logout = async () => {
        await axios.get("/api/users/logout")
        router.push("/login")
    }
    return (
        <>
            <Toaster position="top-center" />
            <div className="text-center mt-3">profile page</div>
            <div className="flex justify-center items-center mt-3">
                <span>
                    {data ? (
                        <Link href={`/profile/${data}`}>{data}</Link>
                    ) : (
                        "nothing"
                    )}
                </span>
            </div>
            <div className="w-1/2 mx-auto h-auto py-3 flex justify-center items-center gap-4">
                <button
                    className="p-1 bg-blue-500 text-white transition hover:bg-blue-700 duration-[500ms]"
                    onClick={getUserDetails}
                >
                    get user info
                </button>
                <button
                    className="p-1 bg-red-500 text-white transition hover:bg-red-700 duration-[500ms]"
                    onClick={logout}
                >
                    logout
                </button>
            </div>
        </>
    )
}

export default Profile
