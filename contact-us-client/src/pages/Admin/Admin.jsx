import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { PiCursorBold } from "react-icons/pi";
import { LuDownload, LuEye, LuLayoutGrid } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const Admin = () => {
  const [info, setInfo] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/submiteddata");
      setInfo(data); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {


    fetchData();
  }, []);

 const handleView=(item)=>{
  setSelectedItem(item);
  document.getElementById('my_modal_3').showModal()
  console.log(item);
 }

 const handleDelete =(id)=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:5000/submiteddata/${id}`)
      .then(res=>{
        console.log(res.data);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        fetchData()
      })
     
    }
  });
  
 }

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
                  {info.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{item._id}</td>
                      <td className="px-4 py-2">{item.fullName}</td>
                      <td className="px-4 py-2">{item.email}</td>
                      <td className="px-4 py-2">{item?.department || "IT"}</td>

                      <td className="px-4 py-2">
                        {item?.designation || "Developer"}
                      </td>

                      <td className="px-4 py-2 text-blue-600 ">
                        <div className="flex gap-3">
                          <button>
                          <LuDownload className="cursor-pointer size-5 hover:bg-gray-300 rounded-full  " />
                          </button>
                          <button onClick={()=>handleView(item)}>
                          <LuEye className="text-green-600 cursor-pointer size-5 hover:bg-gray-300 rounded-full " />
                          </button>
                         <button onClick={()=>handleDelete(item._id)}>
                         <MdDeleteForever className="text-red-600 cursor-pointer size-5 hover:bg-gray-300 rounded-full " />
                         </button>
                          
                        
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_3" className="modal ">
  <div className="modal-box bg-white text-black">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    {selectedItem && (
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
  <h3 className="text-xl font-semibold text-gray-800 mb-3">
    {selectedItem.fullName}
  </h3>
  <div className="bg-white p-4 rounded-md shadow-sm">
    <p className="text-gray-600">
      <span className="font-medium text-gray-800">📧 Email:</span> {selectedItem.email}
    </p>
    <p className="text-gray-600 mt-2">
      <span className="font-medium text-gray-800">💬 Message:</span> {selectedItem.message}
    </p>
  </div>
</div>

)}

  </div>
</dialog>
    </div>
  );
};

export default Admin;
