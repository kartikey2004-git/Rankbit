"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutLink = () => {
  return (
    <div 
    onClick={() => signOut()}
    className='text-slate-500 hover:underline cursor-pointer'>
      Logout &raquo;
    </div>
  )
}

export default LogoutLink

/*

signOut :
   
   - A helper function from NextAuth.
   - Purpose: log the user out and clear their session.


How it works :
   
   - NextAuth clears the session (removes cookies/JWT).

   - By default, the user is redirected to the homepage (or the URL you specify).

---------------------------------------------------


1. Client-side (React components / browser)
  

import { signOut } from "next-auth/react";

<button onClick={() => signOut({ callbackUrl: "/login" })}>
  Logout
</button>
     

   - Sends a request to NextAuth’s API (/api/auth/signout)

   - Clears the user’s session cookies in the browser

   - Redirects the user (default /, or custom callbackUrl)


- Client signOut() handles redirects and session cleanup on the browser side.



2. Server-side (API routes / server components)

   - You don’t call signOut() directly on the server.

   - Instead, you manipulate the session manually (e.g., clearing cookies, invalidating JWTs).

   - On the server, you normally use:

      - getServerSession() to check session

      - and let NextAuth handle logout via its built-in route /api/auth/signout.


  

- If you want to handle logout from an API route (server-side)
    
   - we basically need to call NextAuth’s built-in signout route from your server code.
   

1. Create a custom API route : /auth/api/logout/page.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    
   --> Forward request to NextAuth's built-in signout route <---

    res.redirect("/api/auth/signout");
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


2. Call it from client

const handleLogout = async () => {
  await fetch("/api/logout", { method: "POST" });
};

*/