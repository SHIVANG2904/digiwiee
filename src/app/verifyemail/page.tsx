"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Memoize the verifyUserEmail function
    const verifyUserEmail = useCallback(async () => {
        if (!token) {
            setError("Invalid token");
            setLoading(false);
            return;
        }

        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            setError(null);
        } catch (error: any) {
            setVerified(false);
            setError(error.response?.data?.error || "An error occurred");
            console.log("Error verifying email:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const urlToken = queryParams.get("token") || "";
        setToken(urlToken);
    }, []);

    useEffect(() => {
        if (token) {
            verifyUserEmail();
        } else {
            setError("No token provided");
            setLoading(false);
        }
    }, [token, verifyUserEmail]); // Include verifyUserEmail in the dependencies

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2 className="p-2 bg-orange-500 text-black">{token ? `Token: ${token}` : "No token"}</h2>

                    {verified && (
                        <div>
                            <h2 className="text-2xl">Email Verified</h2>
                            <Link href="/login" className="text-blue-500">Login</Link>
                        </div>
                    )}
                    {error && (
                        <div>
                            <h2 className="text-2xl bg-red-500 text-black">{error}</h2>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
