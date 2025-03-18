import React from "react";
import Navbar from "./Navbar/Navbar";
import { PiCursorBold } from "react-icons/pi";
import { LuDownload, LuLayoutGrid } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";

const Admin = () => {
  return (
    <div className="bg-white">
      <Navbar></Navbar>
      <div className="flex justify-between">
        <div className="w-64"></div>
        <div className="flex-1 mx-20 flex justify-between text-black ">
          <h1 className="text-3xl">Employee</h1>
          <div className="flex gap-5 text-[#3F5F99] ">
            <div className="border-2 rounded-sm p-2">
              <PiCursorBold className="size-6" />
            </div>
            <div className="border-2 rounded-sm p-2">
              <LuLayoutGrid className="size-6 border-2" />
            </div>
            <div className="border-2 rounded-sm p-2">
              <LuDownload className="size-6 border-2" />
            </div>
            <div className="border-2 rounded-sm p-2">
              <IoMdAdd className="size-6 border-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
