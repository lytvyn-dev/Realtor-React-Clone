import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export const fetchListingById = async (listingId) => {
  try {
    const docRef = doc(db, "listings", listingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    toast.error("Error fetching listing 👀", {
      position: "bottom-center",
    });
  }
};
