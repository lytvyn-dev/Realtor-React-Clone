//* firestore
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
//* react
import { useEffect, useState } from "react";
//* react toasts notifications
import { toast } from "react-toastify";

function LandLord({ userRef, listingTitle }) {
  const [landlord, setLandLord] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUserRef = async () => {
      try {
        const docRef = doc(db, "users", userRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLandLord(docSnap.data());
        } else {
          toast.error("Could not find landlord data! 👀", { position: "bottom-center" });
        }
      } catch (error) {}
    };
    getUserRef();
  }, [userRef]);

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form className="flex flex-col gap-4">
      <p>
        Contact {landlord?.name} for {listingTitle}
      </p>
      <textarea
        onChange={messageChangeHandler}
        className="placeholder:text-gray-500 rounded px-4 py-2 border border-gray-300 w-full"
        name="message"
        id="message"
        cols="100%"
        rows="2"
        placeholder="Message"
      ></textarea>
      <a href={`mailto:${landlord?.email}?Subject=${listingTitle}&body=${message}`}>
        <button
          type="button"
          className="text-white font-medium uppercase cursor-pointer bg-blue-600 w-full px-7 py-3 hover:bg-blue-700 hover:shadow-xl transition ease-in-out duration-300 shadow-xl"
        >
          Send message
        </button>
      </a>
    </form>
  );
}

export default LandLord;
