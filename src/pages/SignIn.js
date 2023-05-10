//* pages
import GAuth from "../components/GAuth";
//* icons
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { useState } from "react";
import { Link } from "react-router-dom";

function SingIn() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const changeInputHandler = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  return (
    <section>
      <h1 className="text-center text-3xl w-full mt-6 font-bold">Sign In</h1>
      <div className="container px-6 py-12 h-full max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          <div className="md:w-[67%] lg:w-[50%]">
            <img
              className="rounded-2xl w-full max-lg:mb-12"
              src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
              alt="keys in hand"
            />
          </div>
          <form className="md:w-[67%] lg:w-[40%] lg:ml-20" action="#" method="post">
            <input
              className="py-2 px-4 bg-white border-violet-400 border w-full mb-6"
              type="email"
              name="email"
              placeholder="Email address"
              id="email"
              value={email}
              onChange={changeInputHandler}
            />
            <div className="relative">
              <input
                className=" py-2 px-4 bg-white border-violet-400 border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={changeInputHandler}
              />
              <div onClick={showPasswordHandler} className="text-2xl absolute top-2 right-2">
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between whitespace-nowrap text-sm sm:text-lg my-4">
              <p>
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="ml-1 cursor-pointer text-red-600 font-semibold hover:text-red-700"
                >
                  Register
                </Link>
              </p>
              <Link
                to={"/forgot-password"}
                className="cursor-pointer text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>
            <div className="text-white font-semibold space-y-4 uppercase">
              <button
                className="cursor-pointer bg-blue-600 w-full px-7 py-3 hover:bg-blue-700 hover:shadow-xl transition ease-in-out duration-300 active:shadow-xl"
                type="submit"
              >
                SIGN IN
              </button>
              <span className="form--span">OR</span>
              <GAuth />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SingIn;
