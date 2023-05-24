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

  let title;
  if (listingType === "sell") title = "Places for sale";
  if (listingType === "rent") title = "Places for rent";
  if (listingType === "offers") title = "Recent offers";

  useEffect(() => {
    const fetchListings = async () => {
      if (listingType === "offers") {
        const data = await fetchListingsList(false, null, null, 8);
        setListings(data.listings);
      }
      if (listingType === "rent") {
        const data = await fetchListingsList(true, "type", "rent", 8);
        setListings(data.listings);
      }
      if (listingType === "sell") {
        const data = await fetchListingsList(true, "type", "sell", 8);
        setListings(data.listings);
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
