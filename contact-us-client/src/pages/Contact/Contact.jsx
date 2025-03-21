import Lottie from "lottie-react";
import React, { useState } from "react";
import RegisterLottie from "../../assets/register.json";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://contact-us-server-sigma.vercel.app/submiteddata", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        Swal.fire({
          title: "Submited",
          text: "Your message are stored",
          icon: "success"
        });
        setFormData({
          fullName: "",
          email: "",
          message: "",
        })
        navigate('/thanks')
      });
      
  };

  return (
    <div className="bg-[#E2ECFF] min-h-screen flex flex-col-reverse md:flex-row justify-around items-center">
      <div className="fixed w-[1800px] ml-64 mt-64 mb-32 bg-[#6c9fff]  lg:bg-[#3F5F99] h-[800px] rotate-125"> </div>
      <div className="z-40">
      
        <div className="flex items-center flex-col">
          <img src="/mainicon.png" className="md:w-xs w-44" alt="" />
          <p className="text-black text-center mt-4">
            Welcome back to CyberCreaft Bangladesh,
            <br />
            where your creativity thrives.
          </p>
        </div>
     
        <form onSubmit={handleSubmit} className="space-y-4 z-30 text-black">
         

          <div>
              <label className="block text-xs mb-2 text-[#3F5F99] ">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 rounded-md bg-white"
                required
              />
            </div>

          <div>
              <label className="block text-xs mb-2 text-[#3F5F99] ">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 rounded-md bg-white"
                required
              />
            </div>
        


          <div>
              <label className="block text-xs mb-2 text-[#3F5F99] ">Message</label>
              <textarea
               
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full p-3 rounded-md bg-white"
                required
              />
            </div>

          <button
            type="submit"
            className="w-full bg-[#2f4774] text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        <Link to='/login'>
        <button className="btn my-3 w-full">Admin Login</button>
        </Link>
       
      </div>

      <div>
        <Lottie
          className="md:size-100 size-44"
          animationData={RegisterLottie}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Contact;
