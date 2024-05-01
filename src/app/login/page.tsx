"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

function Login() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("login success", response.data)
            toast.success("login success", {
                position: "top-center",
                duration: 1000,
            })
            await new Promise((resolve, _) => setTimeout(resolve, 1000))
            router.push("/profile")
        } catch (error: any) {
            console.log("login failed")
            toast.error(error.response.data.error, {
                position: "top-center",
                duration: 2000,
            })
        }
    }

    useEffect(() => {
        let { email, password } = user
        if (email.length > 0 && password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <>
            <Toaster position="top-center" />
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <div className="w-[25%] h-auto flex justify-center flex-col p-3 gap-2 border border-white rounded-md">
                    <h1 className="text-center">
                        {loading ? "processing..." : "login"}
                    </h1>
                    <label htmlFor="email">email</label>
                    <input
                        type="text"
                        id="email"
                        className="w-full rounded-md text-slate-950 focus:outline-slate-900"
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        value={user.email}
                    />
                    <label htmlFor="password">password</label>
                    <input
                        type="text"
                        id="password"
                        className="w-full rounded-md text-slate-950 focus:outline-slate-900"
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        value={user.password}
                    />

                    <div className="flex justify-center items-center mt-3">
                        <button
                            onClick={onLogin}
                            disabled={buttonDisabled ? true : false}
                            className="text-white border border-slate-300 p-2 focus:outline-none rounded-lg transition hover:cursor-pointer hover:bg-slate-300 hover:text-slate-950 duration-[500ms]"
                        >
                            {buttonDisabled ? "no login" : "login"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
