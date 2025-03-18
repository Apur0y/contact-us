import React from "react";
import Navbar from "./Navbar/Navbar";
import { PiCursorBold } from "react-icons/pi";
import { LuDownload, LuLayoutGrid } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";

const Admin = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex justify-between">
        <div className="w-64"></div>
        <div className="flex-1 bg-gray-200 p-6 ">
          <div className="flex justify-between text-black mx-11">
            <h1 className="text-3xl">Employee</h1>
            <div className="flex gap-5 text-[#3F5F99]">
              <div className="border-2 rounded-sm p-2">
                <PiCursorBold className="size-6" />
              </div>
              <div className="border-2 rounded-sm p-2">
                <LuLayoutGrid className="size-6" />
              </div>
              <div className="border-2 rounded-sm p-2">
                <LuDownload className="size-6" />
              </div>
              <div className="border-2 rounded-sm p-2">
                <IoMdAdd className="size-6" />
              </div>
            </div>
          </div>
          <div className="text-black mt-5 mx-11  p-3 bg-white rounded-md">
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="border px-2 py-1 w-24 md:w-auto"
                />
                <div className="border-2 border-blue-900 rounded-sm p-2">
                  <TfiReload className="my-auto text-[#3F5F99] size-6" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse ">
                <thead className="border-b border-gray-600">
                  <tr className="text-left">
                    <th className=" px-4 py-2">No.</th>
                    <th className=" px-4 py-2">Employee Id</th>
                    <th className=" px-4 py-2">Name</th>
                    <th className=" px-4 py-2">Email</th>
                    <th className=" px-4 py-2">Department</th>
                    <th className=" px-4 py-2">Designation</th>
                    <th className=" px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100">
                    <td className=" px-4 py-2">1</td>
                    <td className=" px-4 py-2">264816</td>
                    <td className=" px-4 py-2">Nahil</td>
                    <td className=" px-4 py-2">na@hil.com</td>
                    <td className=" px-4 py-2">IT</td>
                    <td className=" px-4 py-2">Junior</td>
                    <td className=" px-4 py-2 text-blue-600 cursor-pointer">Watch</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
