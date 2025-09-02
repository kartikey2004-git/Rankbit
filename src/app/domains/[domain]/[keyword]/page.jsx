"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { use } from "react";
import { HiOutlineTrash } from "react-icons/hi";

const page = ({ params }) => {
  const { domain } = use(params);
  const { keyword } = use(params);

  const decodedKeyword = decodeURIComponent(keyword);

  const router = useRouter();

  async function deleteKeyword() {
    const urlParams =
      "?domain=" + domain + "&keyword=" + encodeURIComponent(keyword);

    const url = "/api/keywords" + urlParams;
    await axios.delete(url);

    router.push("/domains/" + domain);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <Link
            href={`/domains/${domain}`}
            className="text-sm uppercase tracking-wider text-gray-400 block cursor-pointer"
          >
            Domain »
          </Link>

          <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
            {decodedKeyword}
          </h2>
        </div>

        <Button
          title="Delete domain"
          onClick={() => deleteKeyword()}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md transition hover:bg-red-100"
        >
          <HiOutlineTrash className="text-2xl" />
          Delete
        </Button>
      </div>

      <div className="h-36 bg-green-300 rounded-md shrink-0 flex items-center justify-center text-sm font-medium"></div>
    </div>
  );
};

export default page;
