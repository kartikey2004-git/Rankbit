"use client";

import React from "react";
import DomainRow from "./DomainRow";

const DomainsList = ({ domains, keywords, results }) => {
  return (
    <div>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-100 leading-snug">
          {domains.length + " Domains"}
        </h2>
      </div>

      {domains.map((domainDoc, i) => (
        <DomainRow
          key={i}
          {...domainDoc}
          keywords={keywords.filter((k) => k.domain === domainDoc.domain)}
          results={results.filter((r) => r.domain === domainDoc.domain)}
        />
      ))}
    </div>
  );
};

export default DomainsList;
