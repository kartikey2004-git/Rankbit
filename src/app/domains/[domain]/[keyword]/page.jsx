"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import MySwal from "@/lib/swal.js";
import { toast } from "sonner";

const page = () => {
  // useRouter is only for navigation (push, replace, back, etc)

  const router = useRouter();

  // In client components, you can’t access params directly. Instead, we use useParams hook from next/navigation.

  const params = useParams(); // returns an object of route params

  const { keyword, domain } = params; // destructuting the params

  // decodeURIComponent : Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).

  const decodedKeyword = decodeURIComponent(keyword);

  function ShowDeleteKeywordPopup() {
    MySwal.fire({
      title: (
        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
          Are you sure you want to delete keyword
          <span className="font-semibold text-red-600"> "{keyword}" </span>?
          <br />
          <span className="text-base text-gray-500">
            This action cannot be undone.
          </span>
        </p>
      ),
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      confirmButtonColor: "#f00",
      showCloseButton: true,
      showCancelButton: true,
      reverseButtons: true,
      focusCancel: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteKeyword();
      }
    });
  }

  const deleteKeyword = async () => {
    try {
      const urlParams =
        "?domain=" + domain + "&keyword=" + encodeURIComponent(keyword);

      const url = "/api/keywords" + urlParams;

      await axios.delete(url);

      toast.success("Keyword deleted successfully!");
      router.push(`/domains/${domain}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete keyword.");
    }
  };

  return (
    <div className="ml-2 mr-2">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <Link
            href={`/domains/${domain}`}
            className="text-sm uppercase tracking-wider text-gray-400 block cursor-pointer"
          >
            {domain} »
          </Link>

          <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
            {decodedKeyword}
          </h2>
        </div>

        <Button
          title="Delete domain"
          onClick={ShowDeleteKeywordPopup}
          className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-md transition hover:bg-red-600"
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
