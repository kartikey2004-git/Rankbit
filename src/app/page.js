"use client";
import NewDomainForm from "@/components/NewDomainForm";
import DomainsList from "@/components/DomainsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { BarLoader } from "react-spinners";

export default function Home() {
  const [domains, setDomains] = useState([]); // state define for array of domains

  const [keywords, setKeywords] = useState([]); // state define for array of keywords

  const [results, setResults] = useState([]); // state define for array of keywords

  const [loading, setLoading] = useState(false); // state for loading

  // function to fetch domains and keywords
  function fetchDomains() {
    setLoading(true);

    // GET request to fetch all the domains and keywords from database
    axios.get("/api/domains").then(({ data }) => {
      setDomains(data.domains);
      setKeywords(data.keywords);
      setResults(data.results);
      setLoading(false);
    });
  }

  // Fetch domains when the index page loads for the first time
  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <div className="px-6 py-8 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">
            Domains
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            Add and track multiple domains with automated rank updates.
          </p>
        </div>
      </div>

      {/* Add Domain Form */}
      <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg  transition-all">
        <h3 className="text-xl font-medium text-white mb-4">Add New Domain</h3>
        <NewDomainForm onNew={fetchDomains} />
      </div>

      {/* Loader */}
      {loading && (
        <div className="mb-4">
          <BarLoader className="mb-4" width={"100%"} color="#ffffff" />
        </div>
      )}

      {/* Domains List */}
      {!loading && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg transition-all">
          <h3 className="text-xl font-medium text-white mb-4">
            Tracked Domains
          </h3>
          <DomainsList
            domains={domains}
            keywords={keywords}
            results={results}
          />
        </div>
      )}
    </div>
  );
}

/*

Home Page: This is your central dashboard where you can:

    - View all your  along domain with their keyword performance and rankings.

    - Track the ranking of specific keywords for any of your domains.

    - See a complete list of your domain in one place.

   - A simple form to add a new domain whenever you need.

   
*/
