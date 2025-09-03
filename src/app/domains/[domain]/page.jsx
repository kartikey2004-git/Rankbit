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
    <div className="mr-2 ml-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/"
            className="text-sm uppercase tracking-wider text-gray-400 block cursor-pointer"
          >
            Domains »
          </Link>

          <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
            {domain}
          </h2>
        </div>

        <Button
          title="Delete domain"
          onClick={ShowDeleteDomainPopup}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
        >
          <HiOutlineTrash className="text-2xl" />
          Delete
        </Button>
      </div>

      <NewKeywordForm domain={domain} onNew={fetchKeywords} />

      {loading ? (
        <BarLoader className="mb-4" width={"100%"} color="#3B82F6" />
      ) : (
        keywords.map((keywordObj) => (
          <KeywordRow
            key={keywordObj._id}
            {...keywordObj}
            results={results.filter((r) => r.keyword === keywordObj.keyword)}
          />
        ))
      )}

      {!loading && !keywords?.length && <div>No Keywords found:</div>}
    </div>
  );
};

export default page;

// This page lets you add a new keyword for a specific domain and view all the keywords already linked to that domain
