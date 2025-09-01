"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginScreen() {
  return (
    <div className="relative mt-28 max-w-3xl mx-auto px-6 text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          RankBit
        </span>
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
        The smarter way to track, monitor, and grow your SEO rankings — all in
        one place.
      </p>

      <div className="mt-10 flex justify-center">
        <Button
          onClick={() => signIn("google")}
          className="flex items-center gap-3 px-8 py-4 
        bg-gradient-to-r from-indigo-600 to-purple-600 
        hover:from-indigo-700 hover:to-purple-700
        text-white text-lg font-semibold rounded-2xl
        shadow-lg shadow-indigo-300/30
        transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

/*

It is not a server component , so we cannot use server functionality here , so instead we need to use only API calls and we need to do client request to our backend


signIn : 
  
   - helper function provided by NextAuth. 
   - To start the login flow with any provider you’ve configured (Google, GitHub, Credentials, etc.).


How it works
   
  - call it → signIn("google")
  - NextAuth redirects the user to that provider’s login page.

  - User logs in → provider (like Google) verifies identity.
  - NextAuth creates a session and stores it (via cookies/JWT).

  - User is sent back to your app with a valid session.


*/