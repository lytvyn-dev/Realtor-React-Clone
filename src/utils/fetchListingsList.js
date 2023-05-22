import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const fetchListingsList = async (conditionOne, conditionTwo) => {
  let listings = [];
  try {
    const q = query(collection(db, "listings"), where(conditionOne, "==", conditionTwo));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return listings;
  } catch (error) {
    toast.error("Could not fetch you listings! 👀", { position: "bottom-center" });
  }
};
