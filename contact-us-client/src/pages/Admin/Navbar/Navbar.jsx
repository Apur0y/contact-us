import React, { useContext } from "react";
import { MdNotifications } from "react-icons/md";
import { motion } from "framer-motion";
import { AuthContext } from "../../../AuthProvider/Authprovider";
import { useNavigate } from "react-router-dom";
const Navbar = () => {

  const {user}= useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/thanks')
  }

  return (
    <div className=" shadow-md">
      <div className="navbar w-11/12 mx-auto ">
        <div className="w-full md:flex-1">
          <img src="/mainicon.png" className="w-16" alt="" />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input text-black input-bordered bg-white border  border-gray-700 md:w-96"
          />
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }} 
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
            className="my-auto mr-6 text-[#3F5F99] size-6 cursor-pointer"
          >
            <MdNotifications className="size-6" />
          </motion.div>
          <div className="text-black">
            <h1 className=" font-semibold">{user?.fullName || "Jonh Snow"}</h1>
            <p className="text-sm">Admin</p>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
            
              <li>
                <button onClick={()=>handleLogout()}>
                <a>Logout</a>
                </button>
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
