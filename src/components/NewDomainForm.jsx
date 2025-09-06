"use client";
import axios from "axios";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const NewDomainForm = ({ onNew }) => {
  const [domain, setDomain] = useState(""); // State to store the domain value entered in the form

  const handleSubmit = async (e) => {
    e.preventDefault(); // If the event does not get explicitly handled, its default action should not be taken as it normally would be.

    if (!domain) return; // prevent empty submit

    // POST request to add a new domain document into the database

    await axios.post("/api/domains", { domain });
    setDomain("");

    // Whenever a new domain document is added to the database, call fetchDomains again to refresh the list

    onNew();

    // Show a toast for domain registration
    toast("Domain registered successfully!");
  };

  const handleChange = (e) => {
    let value = e.target.value.trim();

    // remove http:// or https:// if pasted
    value = value.replace(/^https?:\/\//, "");

    // strip leading "www."
    value = value.replace(/^www\./, "");

    // remove trailing slash (e.g. "example.com/")
    value = value.replace(/\/$/, "");

    setDomain(value);
  };

  return (
    <form
      className="my-8 flex flex-col sm:flex-row gap-3 items-center w-full max-w-2xl mx-auto mt-6"
      onSubmit={handleSubmit}
    >
      <Input
        value={domain}
        onChange={handleChange}
        className="
        flex-1 px-4 py-3  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border  text-lg rounded-lg grow focus:border-b focus-visible:ring-1 text-gray-100"
        pattern="^(?!https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
        type="text"
        title="Enter a valid domain like example.com (without https://)"
        placeholder="NewDomain.com"
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

export default NewDomainForm;

// We can use this form to add domains to our database, so that we can list them in domainlist
