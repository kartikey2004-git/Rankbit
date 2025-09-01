import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LogoutLink from "@/components/LogoutLink";

const Header = async () => {

  // getServerSession from next-auth is used to get the session , to extract user details

  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <header className="max-w-4xl mx-auto my-6 flex items-center justify-between px-4">
      <a
        href="/"
        className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-blue-500 text-transparent bg-clip-text tracking-tight"
      >
        RankBit
      </a>
      <div className="flex items-center gap-3 bg-slate-200/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-300">
        <img
          src={user?.image}
          alt="Profile image"
          className="h-12 w-12 rounded-full object-cover border border-gray-200 shadow-sm"
        />
        <div className="leading-5">
          <h3 className="font-semibold text-slate-800 text-sm">{user?.name}</h3>
          <LogoutLink />
        </div>
      </div>
    </header>
  );
};

export default Header;
