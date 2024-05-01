"use client"
import axios from "axios"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
function Verify() {
    const [token, setToken] = useState<string>("")
    const [verify, setVerify] = useState(false)
    const [verified, setVerified] = useState(false)
    const searchParams = useSearchParams()
    useEffect(() => {
        const token = searchParams.get("token")
        setToken(token!)
    }, [])
    const verifyUserEmail = async () => {
        //query has your token.
        try {
            setVerify(false)
            const response = await axios.post("/api/users/verifyemail", {
                token,
            })
            toast.success(response.data.message, {
                position: "top-center",
                duration: 1800,
            })
            setVerified(true)
        } catch (error: any) {
            toast.error(error.response.data.error, {
                duration: 1800,
                position: "top-center",
            })
        }
    }
    return (
        <>
            <Toaster position="top-center" />
            <div className="text-center text-2xl mt-3">verify user</div>

            <div className="flex justify-center items-center">
                {" "}
                {token ? (
                    <span className="bg-orange-500 mt-3 inline-block">
                        {token}
                    </span>
                ) : (
                    "no-token"
                )}
            </div>

            <div className="flex justify-center items-center">
                <button
                    className="mt-2 p-2 rounded-md border border-gray-400 text-white transition hover:bg-slate-500 hover:text-black duration-[500ms]"
                    onClick={verifyUserEmail}
                    disabled={verify ? true : false}
                >
                    verify
                </button>
            </div>
            <div className="flex justify-center items-center mt-3">
                {verified ? (
                    <div>
                        verified
                        <div>
                            <Link href={"/login"}>go to login</Link>
                        </div>
                    </div>
                ) : (
                    "not verified yet"
                )}
            </div>
        </>
    )
}

export default Verify
