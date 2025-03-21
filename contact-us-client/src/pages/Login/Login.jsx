import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { MdRadioButtonUnchecked } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/Authprovider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {login} =useContext(AuthContext)
  const navigate = useNavigate()

  const [remember,setRemember] = useState(true)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault()

    try{
      const res =await axios.post('https://contact-us-server-sigma.vercel.app/login',formData)
      localStorage.setItem('token',res.data.token)
      // localStorage.setItem('name',res.data.existingUsers)
      console.log("object,", res.data.existingUsers);
    login(res.data.existingUsers)
  navigate('/admin')
    }
    catch(err){
      toast(err.response?.data?.error || "Invalid Credentials");
    }
 
  };

  return (
    <div className="bg-[#E2ECFF] md:min-h-screen flex md:justify-center md:items-center ">
      <div className="bg-gradient-to-br from-[#bfd7fd] to-[#e9f1ff] md:shadow-md rounded-lg px-32 py-12 md:p-1 flex flex-col md:flex-row md:justify-around  items-center  md:w-3/5 md:h-[500px]">
       
          <div>
            <img src="/mainicon.png" className="w-xs" alt="" />
            <p className="text-black text-center mt-4">
              Welcome back to CyberCreaft Bangladesh,
              <br />
              where your creativity thrives.{" "}
            </p>
          </div>
        

        <div>
          <form onSubmit={handleSubmit} className="space-y-5 w-64 mt-5 md:w-sm text-black">
            <div>
              <label className="block text-xs mb-2 text-[#3F5F99] ">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 rounded-md bg-white text-black"
                required
              />
            </div>
           
            <div>
              <label className="block text-xs mb-2 text-[#3F5F99]">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
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
    
            <Link to='/'>
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
