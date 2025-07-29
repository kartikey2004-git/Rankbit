import React from "react";

const NewDomainForm = () => {
  return (
    <form action="" className="flex gap-2 my-8">
      <input
        className="bg-white border border-b-4 border-blue-200 px-4 py-2 text-xl rounded-lg grow"
        type="text"
        placeholder="NewDomain.com"
      />
      <button className="px-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium  border-b-4 border-indigo-800 transition-all duration-200">
        Add
      </button>
    </form>
  );
};

export default NewDomainForm;
