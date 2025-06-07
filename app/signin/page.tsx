"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [type, setType] = useState("user");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
            type, // Include user type in the sign-in request
        });

        if (res?.error) {
            setError("Invalid username or password or user type");
        } else {
            localStorage.setItem("userType", type); // Set user type in local storage
            router.push("/");  // Redirect to your dashboard or home page
        }
    };

    return (
        <div className='min-h-[90vh] flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg shadow-md flex flex-col items-center'>

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <div className='mb-4 flex justify-between items-center'>
                            <button className={`bg-blue-500 text-white py-2 px-4 mx-12 w-24 rounded ${type === "user" ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => setType("user")}>user</button>
                            <button className={`bg-blue-500 text-white py-2 px-4 mx-12 w-24 rounded ${type === "admin" ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => setType("admin")}>admin</button>
                        </div>
                        <label className='block text-gray-700 mb-2' htmlFor="userName">Username</label>
                        <input
                            type="text"
                            id="userName"
                            className='border border-gray-300 p-2 w-full rounded'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2' htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className='border border-gray-300 p-2 w-full rounded'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className='bg-blue-500 text-white py-2 px-4 rounded w-full'
                    >
                        Sign In
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    )
}

export default Signin