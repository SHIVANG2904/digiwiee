"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    // Function to handle user signup
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("Signup successful!");
            router.push("/login");
        } catch (error: any) {
            console.error("Signup failed", error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Check if the button should be disabled based on user input
    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    {loading ? "Processing..." : "Signup"}
                </h1>
                <hr className="mb-6" />
                <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                    disabled={loading}
                />
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-black"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    disabled={loading}
                />
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-blue-500 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    disabled={loading}
                />
                <button
                    onClick={onSignup}
                    disabled={buttonDisabled || loading}
                    className="w-full p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
                >
                    {loading ? "Processing..." : "Signup"}
                </button>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Visit login page
                    </Link>
                </p>
            </div>
        </div>
    );
}
