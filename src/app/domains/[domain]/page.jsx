"use client";

import DoubleHeader from "@/components/DoubleHeader";
import KeywordRow from "@/components/KeywordRow";
import NewKeywordForm from "@/components/NewKeywordForm";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { use } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

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

  function showDeletePopup() {
    MySwal.fire({
      title: (
        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-600">{domain}</span>?
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
    <>
      <div className="flex items-center justify-between">
        <DoubleHeader preTitle="Domains »" mainTitle={domain} />

        <button
          title="Delete domain"
          onClick={showDeletePopup}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md transition hover:bg-red-100"
        >
          <HiOutlineTrash className="text-2xl" />
          Delete
        </button>
      </div>

      <NewKeywordForm domain={domain} onNew={fetchKeywords} />

      {loading ? (
        <div className="mt-4 text-gray-500">Loading...</div>
      ) : (
        keywords.map((keywordObj) => (
          <KeywordRow key={keywordObj._id} {...keywordObj} />
        ))
      )}
    </>
  );
};

export default page;
