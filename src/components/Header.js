import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";

function Header() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigate();

  useAuthStatus();

  return (
    <header className=" bg-white border-b-2">
      <div className=" flex justify-between items-center px-3  mx-auto max-w-6xl">
        <img
          className="h-5 cursor-pointer"
          src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
          alt="logo"
          onClick={() => navigation("/")}
        />
        <ul className="flex space-x-10">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-black border-red-400 border-b-[3px] inline-block py-3"
                  : "text-gray-500 border-transparent border-b-[3px] inline-block py-3"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-black border-red-400 border-b-[3px] inline-block py-3"
                  : "text-gray-500 border-transparent border-b-[3px] inline-block py-3"
              }
              to="/offers"
            >
              Offers
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-black border-red-400 border-b-[3px] inline-block py-3"
                  : "text-gray-500 border-transparent border-b-[3px] inline-block py-3"
              }
              to={isLoggedIn ? "profile" : "sign-in"}
            >
              {isLoggedIn ? "Profile" : "Sign in"}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
