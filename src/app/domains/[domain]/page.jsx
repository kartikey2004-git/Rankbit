"use client";

import KeywordRow from "@/components/KeywordRow";
import NewKeywordForm from "@/components/NewKeywordForm";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import MySwal from "@/lib/swal.js";
import { toast } from "sonner";
import { motion } from "framer-motion";

const page = () => {
  const [keywords, setKeywords] = useState([]); //state define for array of keywords

  const [results, setResults] = useState([]); //state define for array of results

  const [loading, setLoading] = useState(false); // state for loading

  // useRouter is only for navigation (push, replace, back, etc)

  const router = useRouter();

  // In client components, you can’t access params directly. Instead, we use useParams hook from next/navigation.

  const params = useParams(); // returns an object of route params

  const { domain } = params; // destructure your param

  const fetchKeywords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/keywords?domain=${domain}`);
      setKeywords(response.data.keywords);
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDomain = async () => {
    try {
      await axios.delete(`/api/domains?domain=${domain}`);
      toast("Domain deleted successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error deleting domain:", error);
    }
  };

  function ShowDeleteDomainPopup() {
    MySwal.fire({
      title: (
        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
          Are you sure you want to delete domain
          <span className="font-semibold text-red-600"> "{domain}" </span>?
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
        deleteDomain();
      }
    });
  }

  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <div className="px-6 py-8 w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-md">
        <div className="space-y-1">
          <Link
            href="/"
            className="text-sm uppercase tracking-wider text-gray-400  transition-colors"
          >
            Domains »
          </Link>
          <h2 className="text-2xl font-semibold text-white leading-snug">
            {domain}
          </h2>
        </div>

        <Button
          title="Delete domain"
          onClick={ShowDeleteDomainPopup}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200"
        >
          <HiOutlineTrash className="text-xl" />
          Delete
        </Button>
      </div>

      {/* Add Keyword Form */}
      <div className="rounded-2xl p-5  hover:border-cyan-400/30 transition-all">
        <h3 className="text-xl font-semibold text-white">
          Add New Keyword
        </h3>
        <NewKeywordForm domain={domain} onNew={fetchKeywords} />
      </div>

      {/* Loader */}
      {loading && (
        <div className="mb-4">
          <BarLoader width={"100%"} color="#ffffff" />
        </div>
      )}

      {/* Keyword List */}
      {!loading && keywords.length > 0 && (
        <motion.div
          className="rounded-2xl divide-y divide-white/10 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {keywords.map((keywordObj) => (
            <motion.div
              key={keywordObj._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <KeywordRow
                {...keywordObj}
                results={results.filter(
                  (r) => r.keyword === keywordObj.keyword
                )}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && keywords.length === 0 && (
        <div className="text-center py-16 rounded-2xl  text-gray-400 text-sm">
          No keywords found for this domain. Add one above to start tracking.
        </div>
      )}
    </div>
  );
};

export default page;

// This page lets you add a new keyword for a specific domain and view all the keywords already linked to that domain
