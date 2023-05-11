import { Fragment, useState, useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
//* firebase auth
import { getAuth } from "firebase/auth";

function Profile() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const { displayName, email } = getAuth().currentUser;
  const [formData, setFormData] = useState({
    name: displayName,
    email,
  });

  const inputChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const logOutClickHandler = () => {
    const success = ctx.logOutHandler();
    if (success) navigate("/sign-in");
  };

  return (
    <Fragment>
      <h1 className="mb-7 text-center text-3xl w-full mt-6 font-bold">My Profile</h1>
      <Form className="w-full px-3 md:w-[50%] m-auto">
        <input
          className="py-2 px-4 bg-white border-violet-400 border w-full mb-6"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          disabled
        />
        <input
          className="py-2 px-4 bg-white border-violet-400 border w-full mb-6"
          type="email"
          name="email"
          id="email"
          disabled
          value={formData.email}
        />
        <div className="flex text-sm sm:text-lg items-start md:flex-row justify-between whitespace-nowrap">
          <p>
            Do you want to change your name?{" "}
            <button className=" cursor-pointer ml-1 text-red-400 hover:text-red-700 transition-colors">
              Edit
            </button>
          </p>
          <button
            onClick={logOutClickHandler}
            className=" text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
          >
            Sign out
          </button>
        </div>
      </Form>
    </Fragment>
  );
}

export default Profile;
