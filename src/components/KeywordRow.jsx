"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const KeywordRow = ({ keyword, domain, results }) => {
  const latestResult = [...results].reverse()[0];
  const [latestRank, setLatestRank] = useState(latestResult?.rank);

  const router = useRouter();

  function checkRank() {
    if (!latestRank) {
      const url = "/api/results?id=" + latestResult.brightDataResponseId;

      axios.get(url).then((response) => {
        const newRankFromDatabase = response.data.rank;
        if (newRankFromDatabase) {
          setLatestRank(newRankFromDatabase);
          router.refresh();
        } else {
          // retry after 3 sec if rank not ready
          setTimeout(checkRank, 3000);
        }
      });
    }
  }

  useEffect(() => {
    if (!latestRank) {
      checkRank();
    }
  }, [latestRank]);

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-200 my-4">
      <div className="flex flex-col">
        <Link
          href={"/domains/" + domain + "/" + encodeURIComponent(keyword)}
          className="text-lg font-semibold text-gray-900 block"
        >
          {keyword}
        </Link>
      </div>

      {/* this will show the graph and under it I want to show , for a particular day , the position is something */}

      <div className="w-32 h-[72px] bg-green-100 rounded-md shrink-0 flex items-center justify-center text-green-800 text-sm font-medium">
        {!latestRank && <div>Checking Rank...</div>}
        {latestRank && <div>{latestRank}</div>}
      </div>
    </div>
  );
};

export default KeywordRow;