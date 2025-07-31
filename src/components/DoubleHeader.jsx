import Link from "next/link";
import React from "react";

const DoubleHeader = ({ preTitle, mainTitle, preTitleLink }) => {
  return (
    <div className="space-y-1">
      {preTitleLink && (
        <Link
          href={preTitleLink}
          className="text-sm uppercase tracking-wider text-gray-400 block cursor-pointer"
        >
          {preTitle}
        </Link>
      )}
      {!preTitleLink && (
        <h3 className="text-sm uppercase tracking-wider block text-gray-400">
          {preTitle}
        </h3>
      )}

      <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
        {mainTitle}
      </h2>
    </div>
  );
};

export default DoubleHeader;
