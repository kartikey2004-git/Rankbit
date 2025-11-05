"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import MySwal from "@/lib/swal.js";
import { toast } from "sonner";
import Chart from "@/components/Chart";
import { motion } from "framer-motion";

const page = () => {
  // useRouter is only for navigation (push, replace, back, etc)

  const router = useRouter();

  // In client components, you can’t access params directly. Instead, we use useParams hook from next/navigation.

  const params = useParams(); // returns an object of route params

  const { keyword, domain } = params; // destructuting the params

  const [results, setResults] = useState([]);

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

  function fetchResults() {
    axios
      .get(`/api/keywords?keyword=${keyword}&domain=${domain}`)
      .then((response) => setResults(response.data.results));
  }

  useEffect(() => {
    fetchResults();
  }, []);

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
    <div className="px-6 py-8 w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-md">
        <div className="space-y-1">
          <Link
            href={`/domains/${domain}`}
            className="text-sm uppercase tracking-wider text-gray-400  transition-colors"
          >
            {domain} »
          </Link>
          <h2 className="text-2xl font-semibold text-white leading-snug">
            {decodedKeyword}
          </h2>
        </div>

        <Button
          title="Delete keyword"
          onClick={ShowDeleteKeywordPopup}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200"
        >
          <HiOutlineTrash className="text-xl" />
          Delete
        </Button>
      </div>

      {/* Chart Section */}
      {results && results.length > 0 ? (
        <motion.div
          className="rounded-2xl p-6  shadow-md  transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Keyword Performance
          </h3>
          <Chart width={"100%"} results={results} />
        </motion.div>
      ) : (
        <div className="text-center py-16  rounded-2xl backdrop-blur-md text-gray-400 text-sm">
          No ranking data available yet for this keyword.
        </div>
      )}
    </div>
  );
};

export default page;

// This is single page for keyword for a specific domain and view all the stats and graphs for that keyword