import React from "react";
import {Link} from "react-router-dom";
import NavbarLink from "../NavbarLink/NavbarLink";

interface Props {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({ token, setToken }: Props) => {
  const onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setToken("");
    window.localStorage.setItem("token", "");
    window.location.reload();
  }
  
  return (
    <nav className="bg-green-200 border-gray-200 mb-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">SpringBlog</span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-green-200">
            { token !== "" ? (
              <>
                <li>
                  <NavbarLink path="/profile">Profile</NavbarLink>
                </li>
                <li>
                  <NavbarLink path="/" onClick={onLogoutClick}>Logout</NavbarLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavbarLink path="/login">Login</NavbarLink>
                </li>
                <li>
                  <NavbarLink path="/register">Register</NavbarLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
