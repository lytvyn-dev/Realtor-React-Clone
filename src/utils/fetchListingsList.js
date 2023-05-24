import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
//* react toasts
import { toast } from "react-toastify";

export const fetchListingsList = async (
  whereFunc = false,
  conditionOne = null,
  conditionTwo = null,
  limitNum = 5
) => {
  let listings = [];
  let q;

  try {
    if (whereFunc) {
      const data = query(
        collection(db, "listings"),
        where(conditionOne, "==", conditionTwo),
        orderBy("timeStamp", "desc"),
        limit(limitNum)
      );
      q = data;
    }

    if (!whereFunc) {
      const data = query(collection(db, "listings"), orderBy("timeStamp", "desc"), limit(limitNum));
      q = data;
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return { listings, querySnapshot };
  } catch (error) {
    console.log(error);
    toast.error("Could not fetch you listings! 👀", { position: "bottom-center" });
  }
};
