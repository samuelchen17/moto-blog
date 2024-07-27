import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import helmetIcon from "../assets/helmet.svg";

const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link className="flex justify-center items-center gap-2" to="/">
        <img src={helmetIcon} className="h-[60px]" />
        <span className="text-4xl font-semibold">Sam's Moto Blog</span>
      </Link>
    </Navbar>
  );
};

export default Header;
