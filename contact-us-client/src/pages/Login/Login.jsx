import Lottie from "lottie-react";
import React, { useState } from "react";
import RegisterLottie from "../../assets/register.json";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { MdRadioButtonUnchecked } from "react-icons/md";

const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [remember,setRemember] = useState(true)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    console.log("Go sjhe");
  };

  return (
    <div className="bg-[#E2ECFF] min-h-screen flex justify-center items-center">
      <div className="bg-gradient-to-br from-[#bfd7fd] to-[#e9f1ff] shadow-md rounded-lg flex justify-around  items-center  w-3/5 h-[500px]">
        <div>
          <div>
            <img src="/mainicon.png" className="w-xs" alt="" />
            <p className="text-black text-center mt-4">
              Welcome back to CyberCreaft Bangladesh,
              <br />
              where your creativity thrives.{" "}
            </p>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-5 w-sm text-black">
            <div>
              <label className="block text-xs mb-2 text-[#3F5F99] ">Email Address</label>
              <input
                type="email"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 rounded-md bg-white"
                required
              />
            </div>
           
            <div>
              <label className="block text-xs mb-2 text-[#3F5F99]">Password</label>
              <input
                type="password"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded-md bg-white"
                required
              />
            </div>
           <div className="flex justify-between mt-4 text-[#3F5F99]">
            <div className="flex my-auto gap-1">
              <button type="button" onClick={()=>setRemember(!remember)}>
              {
                remember?<MdRadioButtonUnchecked /> : <FaCircleCheck />
              }
              </button>
            
                 <p>Remember me</p>
            </div>
    
            <Link >
            <button className="hover:underline cursor-grab">Forgot password?</button>
            </Link>
            
           </div>
  
           
            <button
              type="submit"
              className="w-full bg-[#3F5F99] text-white p-4 rounded-md hover:bg-[#3d527a]"
            >
              Submit
            </button>
          </form>
          <div className="divider text-gray-600 font-semibold">Or</div>
          <div className="flex items-center justify-center">
            <p className="text-gray-800">Don't have an account?</p>
            <Link to='/register'>
            <button className="text-[#3F5F99] ml-1 font-semibold hover:underline">Sign Up</button>
            </Link>

          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
