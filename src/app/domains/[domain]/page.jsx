"use client";

import KeywordRow from "@/components/KeywordRow";
import NewKeywordForm from "@/components/NewKeywordForm";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { domain } = use(params);

  const fetchKeywords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/keywords?domain=${domain}`);
      setKeywords(response.data);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDomain = async () => {
    try {
      await axios.delete(`/api/domains?domain=${domain}`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting domain:", error);
    }
  };

  // deleteDomain();

  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/"
            className="text-sm uppercase tracking-wider text-gray-400 block cursor-pointer"
          >
            Domains »
          </Link>

          {!preTitleLink && (
            <h3 className="text-sm uppercase tracking-wider block text-gray-400">
              Domains »
            </h3>
          )}

          <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
            {domain}
          </h2>
        </div>

        <Button
          title="Delete domain"
          onClick={() => deleteDomain()}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md transition hover:bg-red-100"
        >
          <HiOutlineTrash className="text-2xl" />
          Delete
        </Button>
      </div>

      <NewKeywordForm domain={domain} onNew={fetchKeywords} />

      {loading ? (
        <div className="mt-4 text-gray-500">Loading...</div>
      ) : (
        keywords.map((keywordObj) => (
          <KeywordRow key={keywordObj._id} {...keywordObj} />
        ))
      )}

      {!loading && !keywords?.length && <div>No Keywords found:</div>}
    </>
  );
};

export default page;
