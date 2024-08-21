import { useState } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
  Modal,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import helmetIcon from "/helmet.svg";
import { IoMdSearch } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import LoginModal from "../modal/LoginModal";

const NavBar = () => {
  const path = useLocation().pathname;
  const [openModal, setOpenModal] = useState(false);

  return (
    <Navbar className="border-b-2">
      <NavbarBrand as={"div"}>
        <Link className="flex justify-center items-center gap-2" to="/">
          <img src={helmetIcon} className="h-[60px]" />
          <span className="text-4xl font-semibold">Sam's Moto Blog</span>
        </Link>
      </NavbarBrand>
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
      {/* order-2 to place it at the end */}
      <div className="flex gap-2 md:order-2">
        <Button className="hidden sm:inline" pill color="blue">
          <FaMoon />
        </Button>
        {/* <Link to="/login">
          <Button gradientDuoTone="greenToBlue">Log In</Button>
        </Link> */}
        <Button onClick={() => setOpenModal(true)}>Login</Button>
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink active={path === "/register"} as={"div"}>
          <Link to="/register">About</Link>
        </NavbarLink>
        <NavbarLink active={path === "/edit"} as={"div"}>
          <Link to="/edit">Reviews</Link>
        </NavbarLink>
      </NavbarCollapse>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        // initialFocus={emailInputRef}
      >
        <LoginModal />
      </Modal>
    </Navbar>
  );
};

export default NavBar;
