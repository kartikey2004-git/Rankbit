"use client";
import NewDomainForm from "@/components/NewDomainForm";
import DomainsList from "@/components/DomainsList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [domains, setDomains] = useState([]);
  const [keywords,setKeywords] = useState([])
  const [loading,setLoading] = useState(false)


  function fetchDomains(){
    setLoading(true)
    axios.get("/api/domains").then((res) => {
      setDomains(res.data.domains);
      setKeywords(res.data.keywords)
      setLoading(false)
    });
  }

  useEffect(() => {
    fetchDomains()
  }, []);

  return (
    <div>
      <NewDomainForm onNew={fetchDomains}/>
      {loading && (
        <div>Loading...</div>
      )}
      {!loading && (
        <DomainsList domains={domains} keywords={keywords}/>
      )}
    </div>
  );
}
