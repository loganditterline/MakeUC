import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import Home from "./pages/home.js";
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children:[
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "home",
        element: <Home/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);