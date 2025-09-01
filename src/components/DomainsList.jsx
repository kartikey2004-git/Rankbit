"use client";

import React from "react";
import DomainRow from "./DomainRow";

const DomainsList = ({ domains, keywords }) => {
  return (
    <div>
      <div className="space-y-1">
        <h3 className="text-sm uppercase tracking-wider block text-gray-400">
          Your Domains
        </h3>

        <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
          {domains.length + " Domains"}
        </h2>
      </div>

      {domains.map((domainDoc, i) => (
        <DomainRow
          key={i}
          {...domainDoc}
          keywords={keywords.filter((k) => k.domain === domainDoc.domain)}
        />
      ))}
    </div>
  );
};

export default DomainsList;
