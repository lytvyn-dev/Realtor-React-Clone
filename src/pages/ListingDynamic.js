import { useEffect, useState } from "react";
import { useParams } from "react-router";
//* components
import Spinner from "../components/Spinner";
import ListingsList from "../components/ListingsList";
//* utils
import { fetchListingsList } from "../utils/fetchListingsList";

function ListingDynamic({ type }) {
  const { listingType } = useParams();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  const title =
    (listingType === "offers" && "Offers") ||
    (listingType === "rent" && "Places for rent") ||
    listingType === "sell" ||
    "Places for sell";

  useEffect(() => {
    const fetchListings = async () => {
      if (listingType === "offers") {
        const data = await fetchListingsList("offer", true);
        setListings(data);
      }
      if (listingType === "rent") {
        const data = await fetchListingsList("type", "rent");
        setListings(data);
      }
      if (listingType === "sell") {
        const data = await fetchListingsList("type", "sell");
        setListings(data);
      }
      setLoading(false);
    };
    fetchListings();
  }, [listingType]);

  if (loading) return <Spinner />;

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl text-center font-bold mb-10">{title}</h1>
      <ListingsList data={listings} />
    </section>
  );
}

export default ListingDynamic;
