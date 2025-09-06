import Link from "next/link";
import React from "react";
import Chart from "./Chart";

const DomainRow = ({ domain, icon, keywords, results }) => {
  return (
    <div className="flex items-center justify-between gap-4 my-4 flex-col sm:flex-row border border-gray-300 rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-3xl mx-auto">
      <div className="flex items-start gap-3 flex-1">
        {icon && <img src={icon} className="h-12" />}

        {/* when we click on particular domain , it redirects us to single domain page where all keywords listed for particular domain */}

        <div>
          <Link
            className="text-lg font-semibold text-gray-100 block"
            href={"/domains/" + domain}
          >
            {domain}
          </Link>

          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((keywordDoc, i) => (
              <>
                <Link
                  href={"/domains/" + domain + "/" + keywordDoc.keyword}
                  key={i}
                  className="shadow-lg
        bg-black backdrop-blur-md border border-white/20 text-gray-200  px-2 py-1 rounded-md text-sm font-medium  transition-all duration-300 
"
                >
                  {keywordDoc.keyword}
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Chart results={results} width={300} />
      </div>
    </div>
  );
};

export default DomainRow;

/*

JSON.parse() : Converts a JSON string → JavaScript object.

JSON.stringify() : Converts a JavaScript object → JSON string.

*/