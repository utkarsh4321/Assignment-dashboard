
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import SignIn from "../features/signin/Signin";
import ErrorComponent from "../features/ErrorComponent/Error";
import App from "../App";
import SignUp from "../features/signup/SignUp";
import Dashboard from "../features/dashboard/dashboard";
  

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement:ErrorComponent(),
      Component:App,
      children:[
        {
          path: "login",
          Component:SignIn
        },
        {
          path: "register",
          Component:SignUp
        },
        {
          path: "dashboard",
          Component:Dashboard
        }
      ]
    },
    
    
  ]);

  export default router;