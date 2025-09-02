import Link from "next/link";
import React from "react";

const KeywordRow = ({ keyword, domain }) => {
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

      <div className="w-32 h-[72px] bg-green-100 rounded-md shrink-0 flex items-center justify-center text-green-800 text-sm font-medium"></div>
    </div>
  );
};

export default KeywordRow;