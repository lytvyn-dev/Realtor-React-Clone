import { useEffect, useState } from "react";
//* components
import ListingsList from "../components/ListingsList";
import Spinner from "../components/Spinner";
//* utils
import { fetchListingsList } from "../utils/fetchListingsList";
//* firestore
import { db } from "../firebase";
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
//* react toasts
import { toast } from "react-toastify";
//* motion
import { motion } from "framer-motion";

function Offers() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastListings, setLastListings] = useState();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await fetchListingsList(true, "offer", true, 4);
        const lastVisible = data.querySnapshot.docs[data.querySnapshot.docs.length - 1];
        setLastListings(lastVisible);
        setListings(data.listings);
        setLoading(false);
      } catch (error) {}
    };
    fetchListings();
  }, []);

  const loadMoreListings = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timeStamp", "desc"),
        startAfter(lastListings),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastListings(lastVisible);
      const data = [];
      querySnap.forEach((doc) => {
        return data.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...data]);
    } catch (error) {
      toast.error("Could not fetch listing", { position: "bottom-center" });
    }
  };

  if (loading) return <Spinner />;

  const variants = {
    hidden: {
      opacity: 0,
      y: "20px",
    },
    show: {
      opacity: 1,
      y: "0px ",
    },
  };

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="show"
      transition={{ delay: 0.3 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-3xl text-center font-bold mb-10">Offers</h1>
      <ListingsList data={listings} />
      <div className="flex items-center justify-center">
        {lastListings && (
          <button
            onClick={loadMoreListings}
            className="bg-white px-3 py-1 border border-gray-300"
            type="button"
          >
            Load more
          </button>
        )}
      </div>
    </motion.section>
  );
}

export default Offers;
