import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LogoutLink from "@/components/LogoutLink";

const Header = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);

  const user = session?.user;

  return (
    <header className="max-w-4xl mx-auto my-6 flex items-center justify-between px-4">
      <a
        href=""
         className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-blue-500 text-transparent bg-clip-text tracking-tight"
      >
        Rank Tracker
      </a>
      <div className="flex items-center gap-3 bg-slate-200/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-300">
        <img
          src={user?.image}
          alt="profile image"
          className="h-12 rounded-full"
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
