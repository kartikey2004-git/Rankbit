"use client";

import DoubleHeader from "@/components/DoubleHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { use } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

  const showDeletePopup = () => {
    MySwal.fire({
      title: (
        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
          Are you sure you want to delete keyword {" "}
          <span className="font-semibold text-red-600">"{decodedKeyword}"</span>?
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
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <DoubleHeader 
        preTitle={domain + ' »'} 
        mainTitle={decodedKeyword} 
        preTitleLink={`/domains/${domain}`}
        />

        <button
          title="Delete domain"
          onClick={showDeletePopup}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md transition hover:bg-red-100"
        >
          <HiOutlineTrash className="text-2xl" />
          Delete
        </button>
      </div>

      <div className="h-36 bg-green-300 rounded-md shrink-0 flex items-center justify-center text-sm font-medium"></div>
    </div>
  );
};

export default page;
