"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful!");
            router.push("/home");
        } catch (error: any) {
            console.error("Login failed", error.message);
            toast.error(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    {loading ? "Processing..." : "Login"}
                </h1>
                <hr className="mb-6" />
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
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className="w-full p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
                >
                    {loading ? "Processing..." : "Login"}
                </button>
                <p className="text-center mt-4">
                    Dont have an account?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Visit Signup page
                    </Link>
                </p>
            </div>
        </div>
    );
}
