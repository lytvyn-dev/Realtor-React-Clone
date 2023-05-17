import Form from "../components/Form";
//* firebase
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
//* react
import { useState, useEffect } from "react";
import { useParams } from "react-router";

function EditListing() {
  const { listingId } = useParams();
  const auth = getAuth();
  const [listing, setListing] = useState();

  useEffect(() => {
    const fetchListings = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
      }
    };
    fetchListings();
  }, [auth.currentUser.uid, listingId]);

  return <Form type={"edit"} data={listing} listingId={listingId} />;
}

export default EditListing;
