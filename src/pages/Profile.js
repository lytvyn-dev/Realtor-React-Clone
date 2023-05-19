import { Fragment, useState, useContext, useEffect } from "react";
import AuthContext from "../store/AuthContext";
//* firebase auth
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
//* react toasts
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
//* icons
import { FcHome } from "react-icons/fc";
//* components
import ListingsList from "../components/ListingsList";
//* utils
import { fetchListingsList } from "../utils/fetchListingsList";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const { logOutHandler } = useContext(AuthContext);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      const condition = "userRef";
      const data = await fetchListingsList(db, condition, auth.currentUser.uid);
      setListings(data);
    };
    fetchListings();
  }, [auth.currentUser.uid]);

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
    logOutHandler();
  };

  const onDeleteListing = async (id) => {
    if (window.confirm("Are you sure you want to delete the listing?")) {
      await deleteDoc(doc(db, "listings", id));
      const uploadedListings = listings.filter((listing) => listing.id !== id);
      setListings(uploadedListings);
      toast.success("Listing deleted!", { position: "bottom-center" });
    }
  };

  const onEditListing = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  return (
    <Fragment>
      <div>
        <h1 className="mb-7 text-center text-3xl w-full mt-6 font-bold">My Profile</h1>
        <form className="w-full px-3 md:w-[40%] m-auto">
          <input
            className={`py-2 px-4 bg-white border-violet-400 border border-solid w-full mb-6 ${
              changed && "bg-red-400 border-black focus:border-black"
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
          <div className="flex mb-6 text-sm sm:text-lg items-start md:flex-row justify-between whitespace-nowrap">
            <p>
              Do you want to change your name?
              <button
                type="button"
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
              type="button"
              onClick={logOutClickHandler}
              className=" text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
            >
              Sign out
            </button>
          </div>
          <Link
            to="/create-listing"
            className="flex items-center justify-center text-lg gap-5 uppercase text-white cursor-pointer bg-blue-600 w-full px-7 py-3 hover:bg-blue-700 hover:shadow-xl transition ease-in-out duration-300 active:shadow-xl rounded"
          >
            <FcHome className="pointer-events-none bg-rose-200 w-7 h-7 flex justify-center items-center rounded-full p-1" />
            sell or rent your home
          </Link>
        </form>
      </div>
      <div className="mt-10">
        <h3 className="text-center text-lg font-semibold mb-8">My Listings</h3>
        <ListingsList onDelete={onDeleteListing} onEdit={onEditListing} data={listings} />
      </div>
    </Fragment>
  );
}

export default Profile;
