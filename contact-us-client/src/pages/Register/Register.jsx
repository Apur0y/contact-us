import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleBtn from "./GoogleBtn/GoogleBtn";


const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    cpassword:""
  });

  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;
 
    setFormData({ ...formData, [name]: value });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formData.password != formData.cpassword){
      toast("Password do not match!")
      return
    }
    else{
    

      axios.post("https://contact-us-server-sigma.vercel.app/signup",formData)
      .then(res=>{
        toast("Successfull")
        console.log(res.data)
   navigate('/admin')
    })
    }


  };

  return (
    <div className="bg-[#E2ECFF] min-h-screen flex md:justify-center md:items-center">
    <div className="bg-gradient-to-br from-[#bfd7fd] to-[#e9f1ff] md:shadow-md px-32 py-12 md:p-1  rounded-lg flex flex-col md:flex-row justify-around  items-center  md:w-3/5 md:h-[600px]">
      <div>
        <div>
          <img src="/mainicon.png" className="w-xs" alt="" />
          <p className="text-black text-center mt-4">
            Welcome back to CyberCreaft Bangladesh,
            <br />
            where your creativity thrives.
          </p>
        </div>
      </div>

      <div className="">
        <form onSubmit={handleSubmit} className="space-y-5 w-sm text-black">
          <div>
            <label className="block text-xs mb-2 text-[#3F5F99] ">Your Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your Full name"
              className="w-full p-3 rounded-md bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-2 text-[#3F5F99] ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full p-3 rounded-md bg-white"
              required
            />
          </div>
         
          <div>
            <label className="block text-xs mb-2 text-[#3F5F99]">Create a password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="must be 8 characters"
              className="w-full p-3 rounded-md bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-2 text-[#3F5F99]">Confirm password</label>
            <input
              type="password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
              placeholder="repeat password"
              className="w-full p-3 rounded-md bg-white"
              required
            />
          </div>
       

         
          <button
            type="submit"
            className="w-full bg-[#3F5F99] text-white p-4 rounded-md hover:bg-[#3d527a]"
          >
            Create account
          </button>
        </form>
        <div className="divider text-gray-600 font-semibold">Or</div>
        <div className="flex items-center justify-center">
          <p className="text-gray-800">Already have an account?</p>
          <Link to='/login'>
          <button className="text-[#3F5F99] ml-1 font-semibold hover:underline">Log in</button>
          </Link>
       
        </div>
      
         <GoogleBtn></GoogleBtn>
         {/* <FacebookBtn></FacebookBtn> */}
      </div>
    </div>
    
  </div>
  );
};

export default Register;
