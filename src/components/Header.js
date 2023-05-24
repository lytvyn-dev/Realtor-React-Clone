import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import { useContext, useState } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
//*react icons
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigate();

  useAuthStatus();

  return (
    <header className=" bg-white border-b-2">
      <div className="min-h-[51px] flex justify-between items-center px-3  mx-auto max-w-6xl ">
        <img
          className="h-5 cursor-pointer z-[1001]"
          src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
          alt="logo"
          onClick={() => navigation("/")}
        />
        {!isNavOpen && (
          <AiOutlineMenuUnfold
            onClick={() => setIsNavOpen(true)}
            className="cursor-pointer text-3xl sm:hidden z-[1001]"
          />
        )}
        {isNavOpen && (
          <GrClose
            onClick={() => setIsNavOpen(false)}
            className="cursor-pointer text-2xl  sm:hidden absolute top-4 right-4 z-[1001] hover:scale-110"
          />
        )}

        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white z-[1000] sm:static sm:h-full transition-transform ${
            isNavOpen ? "translate-x-0" : "translate-x-full sm:translate-x-0"
          }`}
        >
          <ul className="text-lg font-semibold flex flex-col w-full h-full items-center justify-center sm:text-base sm:flex-row sm:justify-end sm:space-x-10 relative">
            <li>
              <NavLink
                onClick={() => setIsNavOpen(false)}
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
                onClick={() => setIsNavOpen(false)}
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
                onClick={() => setIsNavOpen(false)}
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
      </div>
    </header>
  );
}

export default Header;
