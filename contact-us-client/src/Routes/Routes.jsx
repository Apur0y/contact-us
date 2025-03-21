import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import Register from "../pages/Register/Register";
import Admin from "../pages/Admin/Admin";
import Thanks from "../pages/Thanks/Thanks";

export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Contact></Contact>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/admin',
          element:<Admin></Admin>
        },
        {
          path:"/thanks",
          element:<Thanks></Thanks>
        }
      ]
    },
  ]);