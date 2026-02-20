"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuth();
    const { signup } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow space-y-4 w-96">
                <h1 className="text-gray-800 text-xl font-semibold text-center">Create account</h1>

                <input
                    className="text-gray-400 w-full border p-2 rounded"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="text-gray-400 w-full border p-2 rounded"
                    placeholder="Create password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-[#46c2de] text-white py-2 rounded"
                    onClick={() => {
                        signup(email, password);
                        router.push("/dashboard");
                    }}
                >
                    Sign up
                </button>
            </div>
        </main>
    );
}