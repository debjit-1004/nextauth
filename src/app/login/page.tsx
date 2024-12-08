"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("login success", response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    if (!isClient) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    {loading ? "Processing..." : "Welcome Back"}
                </h1>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            //remember the spread operator hehe
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className={`w-full py-2 px-4 rounded-lg text-white font-medium
                            ${buttonDisabled || loading
                                //see the cursor-not-allowed class in the tailwindcss documentation
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 transition-colors'}`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Do not have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}