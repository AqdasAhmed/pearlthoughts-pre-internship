"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import logo from '../../../components/auth/logo.png';

export default function SignupPage() {
    const router = useRouter();
    const { signup } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow space-y-4 w-96">
                <div className="flex justify-center">
                    <Image
                        src={logo}
                        alt="logo"
                        width={80}
                        height={80}
                        className="rounded-sm"
                    />
                </div>

                <h1 className="text-gray-800 text-xl font-semibold text-center">Create account</h1>

                <div className="space-y-2">
                    <label className="text-gray-500 text-sm">Email</label>
                    <input
                        className="text-gray-400 w-full border p-2 rounded"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-500 text-sm">Password</label>
                    <input
                        type="password"
                        className="text-gray-400 w-full border p-2 rounded"
                        placeholder="Create password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-gray-500 text-sm">Confirm Password</label>
                    <input
                        type="password"
                        className="text-gray-400 w-full border p-2 rounded"
                        placeholder="Repeat password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    className="w-full bg-[#46c2de] text-white py-2 rounded"
                    onClick={() => {
                        if (!email || !password || !confirmPassword) {
                            setError("All fields are required");
                            return;
                        }

                        if (password.length < 4) {
                            setError("Password must be at least 4 characters");
                            return;
                        }

                        if (password !== confirmPassword) {
                            setError("Passwords do not match");
                            return;
                        }

                        signup(email, password);
                        router.push("/dashboard");
                    }}                >
                    Sign up
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div className="text-gray-500 flex items-center justify-center text-sm">
                    Alredy have an account?
                    <Link href="/login" className="text-blue-600 hover:underline ml-1">
                        Log In
                    </Link>
                </div>

            </div>
        </main>
    );
}