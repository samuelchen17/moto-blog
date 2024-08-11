import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-screen-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
