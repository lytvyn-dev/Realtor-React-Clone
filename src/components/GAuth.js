//* firebase
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
//* icons
import { FcGoogle } from "react-icons/fc";
//* react toasts
import { toast } from "react-toastify";
//* react
import { useNavigate } from "react-router";

function GAuth() {
  const navigate = useNavigate();

  const googleAuthHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)

      //? read data from our database and check if user exist
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //? check if user uid is exist
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
        navigate("/");
      } else {
        toast.error("User already exist!", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <button
      onClick={googleAuthHandler}
      type="button"
      className="flex items-center justify-center  cursor-pointer bg-red-600 px-7 py-3 w-full hover:bg-red-700 transition ease-out duration-300 hover:shadow-xl active:shadow-xl"
    >
      <FcGoogle className="mr-2 bg-white rounded-full text-xl" /> CONTINUE WITH GOOGLE
    </button>
  );
}

export default GAuth;
