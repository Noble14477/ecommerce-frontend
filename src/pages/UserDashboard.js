import React from "react";
// import { MdDashboard } from 'react-icons/md'

const UserDashboard = () => {
  return (
    <div className="mt-[4rem]">
      <div className="p-4 mt-[4rem] bg-gray-100 text-gray-800 mx-[1rem] flex justify-between items-center">
        <h2 className="font-semibold text-2xl md:text-4xl mb-5">Dashboard</h2>

        <div>
          <h3 className="text-2xl font-bold">
            Welcome {JSON.parse(localStorage.getItem("user")).username}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
