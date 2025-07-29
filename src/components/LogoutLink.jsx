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