import React from "react";
import {Link} from "react-router-dom";
import NavbarLink from "../NavbarLink/NavbarLink";

interface Props {
}

const Navbar = (props: Props) => {
  return (
    <nav className="bg-green-200 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">SpringBlog</span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-green-200">
            <li>
              <NavbarLink path="/profile">Profile</NavbarLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
