"use client";

import React from "react";
import DoubleHeader from "./DoubleHeader";
import DomainRow from "./DomainRow";

const DomainsList =  ({domains,keywords}) => {
  
  return (
    <div>
      <DoubleHeader
        preTitle={"Your Domains"}
        mainTitle={domains.length + " Domains"}
      />

      {domains.map((domainDoc, i) => (
        <DomainRow 
        key={i} 
        {...domainDoc} 
        keywords={keywords.filter(k => k.domain === domainDoc.domain)}
        />
      ))}
    </div>
  );
};

export default DomainsList;
