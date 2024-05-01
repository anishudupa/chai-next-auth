"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

function Signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("singup success", response.data)
            toast.success("signup success", {
                position: "top-center",
                duration: 1000,
            })
            await new Promise((resolve, _) => setTimeout(resolve, 1000))
            router.push("/login")
        } catch (error: any) {
            console.log("signup failed")
            toast.error(error.response.data.error, {
                position: "top-center",
                duration: 4000,
            })
        }
    }

    useEffect(() => {
        let { email, username, password } = user
        if (email.length > 0 && username.length > 0 && password.length > 0) {
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
                        {loading ? "processing..." : "signup"}
                    </h1>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full rounded-md text-slate-950 focus:ring-slate-900"
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                        value={user.username}
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
                    <div className="flex justify-center items-center mt-3">
                        <button
                            onClick={onSignup}
                            disabled={buttonDisabled ? true : false}
                            className="text-white border border-slate-300 p-2 focus:outline-none rounded-lg transition hover:cursor-pointer hover:bg-slate-300 hover:text-slate-950 duration-[500ms]"
                        >
                            {buttonDisabled ? "no signup" : "signup"}
                        </button>
                    </div>
                </div>
                <Link href={"/login"}>visit login page</Link>
            </div>
        </>
    )
}

export default Signup
