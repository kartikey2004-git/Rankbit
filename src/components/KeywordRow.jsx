"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Chart from "./Chart";

const KeywordRow = ({ keyword, domain, results: defaultResults }) => {
  const resultsRef = useRef(defaultResults || []);

  const isCompleteRef = useRef(
    resultsRef.current.filter((r) => r.complete).length > 0
  );

  const rankExistsRef = useRef(
    resultsRef.current.filter((r) => r.rank).length > 0
  );

  const [isComplete, setIsComplete] = useState(isCompleteRef.current);

  const [rankExists, setRankExists] = useState(rankExistsRef.current);

  useEffect(() => {
    reFetchResultIfNoRank();
  }, []);

  function reFetchResultIfNoRank() {
    if (!isCompleteRef.current) {
      axios
        .get(`/api/results?domain=${domain}&keyword=${keyword}`)
        .then((res) => {
          resultsRef.current = res.data;
          isCompleteRef.current = res.data.filter((r) => r.complete).length > 0;
          rankExistsRef.current = res.data.filter((r) => r.rank).length > 0;
          setRankExists(rankExistsRef.current);
          setIsComplete(isCompleteRef.current);
        });
      setTimeout(() => {
        reFetchResultIfNoRank();
      }, 3000);
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4 pr-0 rounded-xl  border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 my-4">
      <div className="flex flex-col">
        <Link
          href={"/domains/" + domain + "/" + encodeURIComponent(keyword)}
          className="text-lg font-semibold text-gray-200 block"
        >
          {keyword}
        </Link>
      </div>

      {/* this will show the graph and under it I want to show , for a particular day , the position is something */}

      <div className="h-[64px] w-[300px] rounded-md shrink-0 flex items-center justify-center text-white text-sm font-medium pr-0">
        {!rankExists && (
          <div className="block text-center w-full">
            {isComplete === true ? (
              <div>Not in top 100 :(</div>
            ) : (
              <div>Checking rank...</div>
            )}
          </div>
        )}
        {rankExists && (
          <div className="pt-2">
            <Chart results={resultsRef.current} width={300} />
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordRow;
