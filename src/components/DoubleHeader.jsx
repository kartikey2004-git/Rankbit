import React from "react";

const DoubleHeader = ({ preTitle, mainTitle }) => {
  return (
    <div className="space-y-1">
      <h3 className="text-sm uppercase tracking-wider text-gray-400">
        {preTitle}
      </h3>
      <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
        {mainTitle}
      </h2>
    </div>
  );
};

export default DoubleHeader;
