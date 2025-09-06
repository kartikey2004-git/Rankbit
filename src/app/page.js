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
    axios.get("/api/domains").then(({data}) => {
      setDomains(data.domains);
      setKeywords(data.keywords);
      setResults(data.results)
      setLoading(false);
    });
  }

  // Fetch domains when the index page loads for the first time
  useEffect(() => {
    fetchDomains();
  }, []);  

  return (
    <div className="ml-2 mr-2">
      {/* we have a form here and it is for adding a new domain for tracking and on adding new domain , it fetches all domains with new one */}

      <NewDomainForm onNew={fetchDomains} />

      {loading && <BarLoader className="mb-4" width={"100%"} color="#ffffff" />}

      {/* Render the domain list when the app is not loading. */}

      {!loading && <DomainsList domains={domains} keywords={keywords} results={results}/>}
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