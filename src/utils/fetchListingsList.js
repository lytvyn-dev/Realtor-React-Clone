import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const fetchListingsList = async (
  conditionOne = null,
  conditionTwo = null,
  isOrder = false,
  limitNum = 5
) => {
  let listings = [];
  let q;
  try {
    if (isOrder) {
      const data = query(collection(db, "listings"), orderBy("timeStamp", "desc"), limit(limitNum));
      q = data;
    }

    if (!isOrder) {
      const data = query(
        collection(db, "listings"),
        where(conditionOne, "==", conditionTwo),
        limit(limitNum)
      );
      q = data;
    }

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
