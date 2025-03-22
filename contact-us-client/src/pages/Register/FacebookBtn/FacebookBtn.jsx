import React from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";

const FacebookBtn = () => {
  const navigate = useNavigate();

  const handleFacebookResponse = (response) => {
    if (response.accessToken) {
      console.log("User Info:", response);

      // Navigate to /admin with user data
      navigate("/admin", { state: { user: response } });
    } else {
      console.log("Login Failed");
    }
  };

  return (
    <FacebookLogin
      appId="YOUR_FACEBOOK_APP_ID" // Replace with your actual App ID
      autoLoad={false}
      fields="name,email,picture"
      callback={handleFacebookResponse} // This function runs after login
      icon="fa-facebook"
    />
  );
};

export default FacebookBtn;
