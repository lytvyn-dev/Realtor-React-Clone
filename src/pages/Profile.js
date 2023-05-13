import { Fragment, useState, useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
//* firebase auth
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
//* react toasts
import { toast } from "react-toastify";

function Profile() {
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const auth = getAuth();
  const { displayName, email, uid } = auth.currentUser;
  const [formData, setFormData] = useState({
    name: displayName,
    email,
  });

  const SubmitFormHandler = async () => {
    try {
      //* update user in firebase
      if (formData.name !== displayName) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });
        //* update user in firestore
        const usersRef = doc(db, "users", uid);
        await updateDoc(usersRef, {
          displayName: formData.name,
        });
      }
      toast.success("user name was changed!", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("could not change your name!", {
        position: "bottom-center",
      });
    }
  };

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
      <Form className="w-full px-3 md:w-[60%] m-auto">
        <input
          className={`py-2 px-4 bg-white border-violet-400 border w-full mb-6 ${
            changed && "bg-red-200"
          }`}
          type="text"
          name="name"
          id="name"
          value={formData.name}
          disabled={!changed}
          onChange={inputChangeHandler}
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
            Do you want to change your name?
            <button
              onClick={() => {
                changed && SubmitFormHandler();
                setChanged((prevState) => !prevState);
              }}
              className=" cursor-pointer ml-1 text-red-400 hover:text-red-700 transition-colors"
            >
              {changed ? "Apply Edit" : "Edit"}
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
