import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LogoutLink from "@/components/LogoutLink";

const Header = async () => {
  // getServerSession from next-auth is used to get the session , to extract user details

  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <header className="w-full border-b border-white/10 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
        >
          Rank<span className="text-cyan-400">Bit</span>
        </a>

        {/* User Section */}
        <div className="flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full hover:border-cyan-400/40 transition-all">
          <img
            src={user?.image}
            alt="Profile image"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
          />
          <div className="leading-5">
            <h3 className="text-white font-medium text-sm">{user?.name}</h3>
            <LogoutLink />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
