"use client";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import logo from "./logo.png";

export default function LoginForm() {
    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 w-96 space-y-5">

            {/* Logo */}
            <div className="flex justify-center">
                <Image
                    src={logo}
                    alt="logo"
                    width={60}
                    height={60}
                    className="rounded-xl"
                />
            </div>

            <h1 className="text-gray-800 text-2xl font-semibold text-center">Welcome back</h1>
            <p className="text-center text-gray-500 text-sm">
                Login to your account
            </p>

            {/* Email */}
            <div className="space-y-2">
                <label className="text-gray-500 text-sm">Email</label>
                <Input type="email" placeholder="Enter your email" />
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label className="text-gray-500 text-sm">Password</label>
                <Input type="password" placeholder="Enter your password" />
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
            <Button>Sign in</Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px bg-gray-300 w-full" />
                <span className="text-gray-400 text-sm">or</span>
                <div className="h-px bg-gray-300 w-full" />
            </div>

            {/* Google Button */}
            <button className="text-gray-500 w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <FcGoogle size={20} />
                Continue with Google
            </button>
            <div className="text-gray-500 flex items-center justify-center text-sm">
                Don't have an account?
                <Link href="#" className="text-blue-600 hover:underline ml-1">
                    Sign Up
                </Link>
            </div>

        </div>
    );
}