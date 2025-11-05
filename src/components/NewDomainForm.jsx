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
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full"
    >
      {/* Domain Input */}
      <Input
        value={domain}
        onChange={handleChange}
        type="text"
        pattern="^(?!https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
        title="Enter a valid domain like example.com (without https://)"
        placeholder="Enter domain (e.g., newdomain.com)"
        className="flex-1 w-full px-5 py-3 text-base text-gray-100 placeholder-gray-500 
      bg-white/5 border border-white/10 rounded-xl backdrop-blur-md 
      focus:border-zinc-700 focus:ring-1 focus:ring-zinc-400 
      outline-none transition-all duration-300"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        className="px-8 py-3 text-base font-semibold bg-transparent
      text-white border-1 border-zinc-700 rounded-full shadow-lg hover:opacity-90 transition-all duration-300"
      >
        Add Domain
      </Button>
    </form>
  );
};

export default NewDomainForm;

// We can use this form to add domains to our database, so that we can list them in domainlist
