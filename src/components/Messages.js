import React from "react";

export const ErrMessages = (msg) => {
  return (
    <div
      className="bg-red-300 border-l-4 mx-2 mt-4 border-red-500 text-red-700 p-4"
      role="alert"
    >
      <p>{msg}</p>
    </div>
  );
};
export const SuccMessages = (msg) => {
  return (
    <div
      className="bg-green-300 border-l-4 mx-2 mt-4 border-green-500 text-green-700 p-4"
      role="alert"
    >
      <p>{msg}</p>
    </div>
  );
};

 
