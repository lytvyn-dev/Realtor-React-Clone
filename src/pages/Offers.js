import { useEffect, useState } from "react";
//* components
import Spinner from "../components/Spinner";
import ListingsList from "../components/ListingsList";
//* fireStore
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Offers() {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      let offers = [];
      const q = query(collection(db, "listings"), where("offer", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        return offers.push({ id: doc.id, data: doc.data() });
      });
      setOffers(offers);
      setLoading(false);
    };
    fetchOffers();
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl text-center font-bold mb-10">Offers</h1>
      <ListingsList data={offers} />
    </section>
  );
}

export default Offers;
