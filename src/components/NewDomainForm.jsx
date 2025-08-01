"use client";
import axios from "axios";
import React, { useState } from "react";

const NewDomainForm = ({ onNew }) => {
  const [domain, setDomain] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDomain('')
    await axios.post("/api/domains", { domain });
    onNew();
  };
  return (
    <form action="" className="flex gap-2 my-8" onSubmit={handleSubmit}>
      <input
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="bg-white border border-b-4 border-blue-200 px-4 py-2 text-xl rounded-lg grow"
        type="text"
        placeholder="NewDomain.com"
      />
      <button
        type="submit"
        className="px-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium  border-b-4 border-indigo-800 transition-all duration-200"
      >
        Add
      </button>
    </form>
  );
};

export default NewDomainForm;
