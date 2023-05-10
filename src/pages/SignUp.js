//* pages
import GAuth from "../components/GAuth";
//*components
//* icons
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
//* firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
//* react
import { useState } from "react";
import { Link, Form, redirect } from "react-router-dom";
//* react Toastify
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const changeInputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section>
      <h1 className="text-center text-3xl w-full mt-6 font-bold">Sign Up</h1>
      <div className="container px-6 py-12 h-full max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          <div className="md:w-[67%] lg:w-[50%]">
            <img
              className="rounded-2xl w-full max-lg:mb-12"
              src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
              alt="keys in hand"
            />
          </div>
          <Form method="POST" action="/sign-up" className="md:w-[67%] lg:w-[40%] lg:ml-20">
            <input
              type="text"
              placeholder="Full name"
              className="py-2 px-4 bg-white border-violet-400 border w-full mb-6"
              id="name"
              name="name"
              value={name}
              onChange={changeInputHandler}
            />
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
                autoComplete="on"
                onChange={changeInputHandler}
              />
              <div onClick={showPasswordHandler} className="text-2xl absolute top-2 right-2">
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between whitespace-nowrap text-sm sm:text-lg my-4">
              <p>
                Have an account?
                <Link
                  to="/sign-in"
                  className="ml-1 cursor-pointer text-red-600 font-semibold hover:text-red-700"
                >
                  Sing in
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
                className="uppercase cursor-pointer bg-blue-600 w-full px-7 py-3 hover:bg-blue-700 hover:shadow-xl transition ease-in-out duration-300 active:shadow-xl"
                type="submit"
              >
                SIGN up
              </button>
              <span className="form--span">OR</span>
              <GAuth />
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;

export const action = async ({ request, params }) => {
  try {
    const data = await request.formData();
    const inputsData = {
      name: data.get("name"),
      password: data.get("password"),
      email: data.get("email"),
    };
    const { name, password, email } = inputsData;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: name,
    });
    //* send user data to firestore (except password!)!
    const userData = { name, email };
    userData.timeStamp = serverTimestamp();
    await setDoc(doc(db, "users", user.uid), userData);
    return redirect("/");
  } catch (error) {
    toast.error(`${error.message}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }
  return null;
};
