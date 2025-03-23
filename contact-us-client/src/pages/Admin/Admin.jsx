import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { PiCursorBold } from "react-icons/pi";
import { LuDownload, LuEye, LuLayoutGrid } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { toast } from "react-toastify";

const Admin = () => {
  const [info, setInfo] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkbox, setCheckbox] = useState(true);
  const [social,setSocial]=useState(false)

  const printRef = useRef(null);

  console.log(selectedItems);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://contact-us-server-sigma.vercel.app/submiteddata"
      );
      setInfo(data); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelctor = () => {
    setCheckbox(!checkbox);
  };

  const handleSocial=()=>{
    setSocial(!social)
  }

  function copyLink() {
    navigator.clipboard.writeText("https://contact-us-client.vercel.app/").then(() => {
      toast("Link copied to clipboard!");
    });
  }

  const handleReload=()=>{
    fetchData();
    window.location.reload(); 
  }


  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        // Deselect the item
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        // Select the item
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleView = (item) => {
    setSelectedItem(item);
    document.getElementById("my_modal_3").showModal();
    console.log(item);
  };

  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    // Create a clone of the element to modify before rendering
    const clone = element.cloneNode(true);
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(clone);

    // Apply a style to force standard RGB colors
    const styles = document.createElement("style");
    styles.textContent = `
      * {
        color: black !important;
        background-color: white !important;
        border-color: #ccc !important;
        box-shadow: none !important;
      }
    `;
    clone.appendChild(styles);

    // Position off-screen for rendering
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(clone, {
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("employee_details.pdf");
    } finally {
      // Clean up
      document.body.removeChild(tempDiv);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://contact-us-server-sigma.vercel.app/submiteddata/${id}`
          )
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            fetchData();
          });
      }
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex justify-between">
        <div className="md:w-64 hidden md:flex"></div>
        <div className="md:flex-1 w-full bg-gray-200 p-6 ">
          <div className="flex  justify-between text-black md:mx-11">
            <h1 className="text-3xl">Employee</h1>
            <div className="flex gap-5 text-[#3F5F99]">
              {checkbox ? (
                <div className="border-2 rounded-sm p-2">
                  <button onClick={() => handleSelctor()}>
                    <PiCursorBold className="md:size-6" />
                  </button>
                </div>
              ) : (
                <div className="border-2 bg-gray-900 rounded-sm p-2">
                  <button onClick={() => handleSelctor()}>
                    <PiCursorBold className="md:size-6" />
                  </button>
                </div>
              )}

              <div className="border-2 rounded-sm p-2">
                <LuLayoutGrid className="md:size-6" />
              </div>
              <div className="border-2 rounded-sm p-2">
                <button >
                <LuDownload className="md:size-6" />

                </button>
              </div>
              <div className="border-2 rounded-sm p-2">
                
                <button onClick={()=>handleSocial()}>
                <IoMdAdd className="md:size-6 cursor-pointer" />
                </button>
                {
                  social?    (<div class="social-sharing flex flex-col md:flex-row gap-2">
                  <a className="bg-blue-700 text-white p-1 rounded-md" href="https://www.facebook.com/sharer/sharer.php?u=https://contact-us-client.vercel.app" target="_blank"> Facebook</a>
                  <a className="bg-black text-white p-1  rounded-md" href="https://twitter.com/intent/tweet?url=https://contact-us-client.vercel.app&text=Get%20in%20touch%20with%20us!" target="_blank"> X</a>
                  <a className="bg-red-800 text-white p-1  rounded-md" href="mailto:?subject=Contact%20Us&body=Check%20out%20this%20page:%20https://contact-us-client.vercel.app" target="_blank"> Email</a>
                  <button className="bg-amber-600 text-white p-1  rounded-md" onClick={()=>copyLink()}> Copy Link</button>
                </div>):(<div></div>)
                }
             
 
              </div>
            </div>
          </div>
          <div className="text-black mt-5 md:mx-11  p-3 bg-white rounded-md">
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="border px-2 py-1 w-24 md:w-auto"
                />
                <button onClick={()=>handleReload()}>
                <div className="border-2 border-blue-900 rounded-sm p-2">
                  
                  <TfiReload className="my-auto cursor-pointer text-[#3F5F99] md:size-6" />
                
                
                </div>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto md:w-full border-collapse ">
                <thead className="border-b border-gray-600">
                  <tr className="text-left">
                    {checkbox ? "" : <th className="px-4 py-2"></th>}

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
                      {checkbox ? (
                        ""
                      ) : (
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item._id)}
                            onChange={() => handleCheckboxChange(item._id)} // Handle checkbox change
                          />
                        </td>
                      )}

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
                          <button onClick={() => handleDownload()}>
                            <LuDownload className="cursor-pointer md:size-5 hover:bg-gray-300 rounded-full  " />
                          </button>
                          <button onClick={() => handleView(item)}>
                            <LuEye className="text-green-600 cursor-pointer md:size-5 hover:bg-gray-300 rounded-full " />
                          </button>
                          <button onClick={() => handleDelete(item._id)}>
                            <MdDeleteForever className="text-red-600 cursor-pointer md:size-5 hover:bg-gray-300 rounded-full " />
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
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {selectedItem && (
            <div
              ref={printRef}
              className="bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {selectedItem?.fullName}
              </h3>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">📧 Email:</span>{" "}
                  {selectedItem?.email}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium text-gray-800">💬 Message:</span>{" "}
                  {selectedItem?.message}
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
