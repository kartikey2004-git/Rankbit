import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LogoutLink from "@/components/LogoutLink";

const Header = async () => {
  // getServerSession from next-auth is used to get the session , to extract user details

  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <header className="flex justify-between items-center mb-6">
      <a href="/" className="text-3xl font-semibold text-white">
        RankBit
      </a>
      <div className="flex items-center gap-3 border border-gray-200 px-4 py-2 rounded-full">
        <img
          src={user?.image}
          alt="Profile image"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="leading-5">
          <h3 className="text-white font-medium text-sm">{user?.name}</h3>
          <LogoutLink />
        </div>
      </div>
    </header>
  );
};

export default Header;