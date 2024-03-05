import React from "react";
import { Link, Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;


