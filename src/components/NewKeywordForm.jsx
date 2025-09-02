"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const NewKeywordForm = ({ onNew, domain }) => {
  const [keyword, setKeyword] = useState(""); // state for define keyword

  const handleSubmit = async (e) => {
    e.preventDefault(); // If the event does not get explicitly handled, its default action should not be taken as it normally would be.

    if (!keyword) return; // prevent empty submit

    // POST request to add a new keyword document into the database

    await axios.post("/api/keywords", { keyword, domain });
    setKeyword("");

    // Whenever a new keyword document is added to the database, call fetchDomains again to refresh the list

    onNew();

    // Show a toast for keyword registration
    toast("Keyword Created successfully!");
  };

  return (
    <form action="" className="flex gap-2 my-8" onSubmit={handleSubmit}>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="bg-white border border-blue-200 px-4 py-4 text-lg rounded-lg grow border-b-4 focus:border-b focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
        type="text"
        placeholder="Add new KeyWord"
      />

      <Button
        type="submit"
        className="px-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium  border-b-4 border-indigo-800 transition-all duration-200"
      >
        Add
      </Button>
    </form>
  );
};

export default NewKeywordForm;
