import React from "react";
import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";
import helmetIcon from "../assets/helmet.svg";
import { IoMdSearch } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link className="flex justify-center items-center gap-2" to="/">
        <img src={helmetIcon} className="h-[60px]" />
        <span className="text-4xl font-semibold">Sam's Moto Blog</span>
      </Link>
      <form>
        <TextInput
          className="hidden lg:inline"
          type="text"
          placeholder="Search..."
          rightIcon={IoMdSearch}
        />
      </form>
      <Button className="lg:hidden">
        <IoMdSearch />
      </Button>
      <div className="flex gap-2">
        <Button className="hidden sm:inline" pill color="blue">
          <FaMoon />
        </Button>
        <Link className="flex justify-center items-center gap-2" to="/login">
          <Button gradientDuoTone="greenToBlue">Log In</Button>
        </Link>
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <Navbar.Link active>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <NavbarLink active>
          <Link to="/register">About</Link>
        </NavbarLink>
        <NavbarLink active>
          <Link to="/edit">Reviews</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
