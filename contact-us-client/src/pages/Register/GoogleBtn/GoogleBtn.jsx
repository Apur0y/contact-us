import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const clientId = "923810103466-v8o99tvpcb4mredlluek4p957vsos0ta.apps.googleusercontent.com"; // Replace with your actual Client ID

const GoogleBtn = () => {
    const navigate = useNavigate()
    const handleGoogle=()=>{
 navigate('/admin')
    }


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleGoogle()}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleBtn;
