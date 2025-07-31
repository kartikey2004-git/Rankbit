"use client";

import React, { useEffect, useState } from "react";
import DoubleHeader from "./DoubleHeader";
import DomainRow from "./DomainRow";
import axios from "axios";

const DomainsList =  ({domains}) => {
  
  return (
    <div>
      <DoubleHeader
        preTitle={"Your Domains"}
        mainTitle={domains.length + " Domains"}
      />

      {domains.map((domain, i) => (
        <DomainRow key={i} {...domain} />
      ))}
    </div>
  );
};

export default DomainsList;
