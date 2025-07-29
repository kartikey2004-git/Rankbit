"use client";
import { SiGoogle } from "react-icons/si";
import { signIn, signOut } from "next-auth/react";

export default function LoginScreen() {
  return (
    <div className="bg-white mt-20 max-w-md mx-auto p-8 rounded-2xl shadow-md border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-gray-500 uppercase text-sm tracking-wide">
          Welcome back
        </h2>
        <h1 className="text-gray-800 font-bold text-2xl mt-1">
          Login to your account
        </h1>
      </div>

      <button
        onClick={() => signIn("google")}
        className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl border-b-4 border-indigo-800 transition-all duration-200"
      >
        <SiGoogle className="w-4 text-white" />
        Login with Google
      </button>
    </div>
  );
}
