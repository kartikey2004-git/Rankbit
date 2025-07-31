import Link from "next/link";
import React from "react";
import { SiGithub } from "react-icons/si";

const DomainRow = ({ owner, domain, icon }) => {
  const keywords = [
    "github",
    "git",
    "copilot",
    "git share code",
    "free git repos",
  ];
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-blue-200 shadow-sm my-4">
      <div className="flex items-start gap-3 flex-1">
        {icon && <img src={icon} className="h-12" />}

        <div>
          <Link className="text-lg font-semibold text-gray-900 block" href={'/domains/'+ domain}>
            {domain}
          </Link>

          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((keyword, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-32 h-[72px] bg-green-100 rounded-md shrink-0" />
    </div>
  );
};

export default DomainRow;
