// src/components/auth/LoginForm.tsx

"use client";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import logo from "./logo.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 w-96 space-y-5">

            {/* Logo */}
            <div className="flex justify-center">
                <Image
                    src={logo}
                    alt="logo"
                    width={80}
                    height={80}
                    className="rounded-sm"
                />
            </div>

            <h1 className="text-gray-800 text-2xl font-semibold text-center">Welcome back</h1>
            <p className="text-center text-gray-500 text-sm">
                Login to your account
            </p>

            {/* Email */}
            <div className="space-y-2">
                <label className="text-gray-500 text-sm">Email</label>
                <Input
                    type="email"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label className="text-gray-500 text-sm">Password</label>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
                <label className="text-gray-500 flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-white" />
                    Remember me
                </label>

                <Link href="#" className="text-blue-600 hover:underline">
                    Forgot password?
                </Link>
            </div>

            {/* Login */}
            <Button
                onClick={() => {
                    setError("");
                    if(!email || !password) {
                        setError("Please fill in all fields");
                        return;
                    }
                    const success = login(email, password);
                    if (success) router.push("/dashboard");
                    else setError("Invalid email or password");
                }}
            >
                Sign in
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px bg-gray-300 w-full" />
                <span className="text-gray-400 text-xs">Or</span>
                <div className="h-px bg-gray-300 w-full" />
            </div>

            {/* Google Button */}
            <button className="text-gray-500 w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <FcGoogle size={20} />
                Continue with Google
            </button>
            <div className="text-gray-500 flex items-center justify-center text-sm">
                Don't have an account?
                <Link href="/signup" className="text-blue-600 hover:underline ml-1">
                    Sign Up
                </Link>
            </div>

        </div>
    );
}