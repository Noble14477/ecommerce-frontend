import React from 'react'
import { MdDashboard} from "react-icons/md";

const AdminHeader = () => {
  return (
    <div className="bg-[#1f2937] text-white py-4">
        <h1 className="text-2xl md:text-3xl  flex items-center pl-5">
          <MdDashboard className="mx-1 text-md" />
          Dashboard
        </h1>
      </div>
  )
}

export default AdminHeader