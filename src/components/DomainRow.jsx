import Link from "next/link";
import React from "react";
import Chart from "./Chart";
import { motion } from "framer-motion";

const DomainRow = ({ domain, icon, keywords, results }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full p-5 sm:p-6 my-4
      bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg  transition-all duration-300"
    >
      {/* Left Section: Domain + Keywords */}
      <div className="flex items-start gap-4 flex-1 w-full">
        {icon && (
          <img
            src={icon}
            alt={`${domain} icon`}
            className="h-10 w-10 rounded-md object-contain flex-shrink-0"
          />
        )}

        <div className="flex-1">
          {/* Domain Name */}
          <Link
            href={`/domains/${domain}`}
            className="text-lg sm:text-xl font-semibold text-white  transition-colors block"
          >
            {domain}
          </Link>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mt-3">
            {keywords.length > 0 ? (
              keywords.map((keywordDoc, i) => (
                <Link
                  key={i}
                  href={`/domains/${domain}/${keywordDoc.keyword}`}
                  className="px-3 py-1 text-sm font-normal text-gray-200 bg-white/5 border border-white/10 rounded-md 
                  transition-all duration-300"
                >
                  {keywordDoc.keyword}
                </Link>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No keywords yet</span>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Chart */}
      <div className="w-full sm:w-[320px] mt-4 sm:mt-0">
        <Chart results={results} width={300} />
      </div>
    </motion.div>
  );
};

export default DomainRow;

/*

JSON.parse() : Converts a JSON string → JavaScript object.

JSON.stringify() : Converts a JavaScript object → JSON string.

*/
