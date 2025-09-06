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
        className="border px-4 py-4 text-lg rounded-lg grow focus:border-b focus-visible:ring-1 text-gray-100"
        type="text"
        placeholder="Add new KeyWord"
      />

      <Button
        type="submit"
        className="px-8 py-4 font-semibold shadow-lg
        bg-black backdrop-blur-md border border-white/20 text-gray-200 text-lg rounded-full transition-all duration-300 
        hover:scale-[1.03] active:scale-[0.97]"
      >
        Add
      </Button>
    </form>
  );
};

export default NewKeywordForm;
