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
    <form className="flex gap-2 my-8" onSubmit={handleSubmit}>
      <Input
        value={domain}
        onChange={handleChange}
        className="bg-white border border-blue-200 px-4 py-4 text-lg rounded-lg grow border-b-4 focus:border-b focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
        pattern="^(?!https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
        type="text"
        title="Enter a valid domain like example.com (without https://)"
        placeholder="NewDomain.com"
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

export default NewDomainForm;

// We can use this form to add domains to our database, so that we can list them in domainlist
