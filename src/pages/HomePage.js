//* splide spider
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
//* components
import ListingsList from "../components/ListingsList";
import Spinner from "../components/Spinner";
//* react
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
//* react toasts notification
import { toast } from "react-toastify";
//* utils
import { fetchListingsList } from "../utils/fetchListingsList";
//* motion
import { motion } from "framer-motion";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [listings, setListings] = useState({
    recentOffers: {},
    rent: {},
    sell: {},
  });

  useEffect(() => {
    async function fetchListings() {
      try {
        const rent = await fetchListingsList(true, "type", "rent", 5);
        const sell = await fetchListingsList(true, "type", "sell", 5);
        const offers = await fetchListingsList(false, null, null, 5);

        setListings({
          recentOffers: offers.listings,
          rent: rent.listings,
          sell: sell.listings,
        });
      } catch (error) {
        toast.error("Could not fetch listings! 👀", { position: "bottom-center" });
      }
      setLoading(false);
    }
    fetchListings();
  }, []);

  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: true,
    height: "19rem",
  };

  if (loading) return <Spinner />;

  return (
    <motion.section initial={{ opacity: 0, y: "20px" }} whileInView={{ opacity: 1, y: 0 }}>
      <Splide options={options} hasTrack={false} className="relative">
        <div style={{ position: "relative" }}>
          <SplideTrack>
            {listings.recentOffers.map((listing, index) => (
              <SplideSlide key={index}>
                <div
                  className="relative w-full overflow-hidden h-[300px] cursor-pointer"
                  onClick={() => navigate(`category/${listing.data.type}/${listing.id}`)}
                  style={{
                    background: `url(${listing.data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <p className="absolute top-3 left-2 px-3 py-2 bg-blue-500 text-white rounded-br-2xl shadow-black shadow-2xl opacity-80">
                  {listing?.data.address}
                </p>
                <p className="absolute bottom-3 left-2 p-2 bg-red-500 rounded-tr-3xl shadow-black text-white shadow-2xl opacity-80">
                  $
                  {listing?.data.type === "rent"
                    ? listing?.data.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ||
                      listing?.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : listing?.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing?.data.type === "rent" ? "/Month" : null}
                </p>
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>

        <div className="splide__progress absolute top-0 left-0 w-full bg-blue-400">
          <div className="splide__progress__bar" />
        </div>
      </Splide>

      <div className="max-w-6xl mx-auto mt-10">
        <h3 className="text-2xl font-bold xl:px-0 px-4">Recent offers</h3>
        <Link
          className="block mb-3 text-sm px-4 xl:px-0 text-blue-600 cursor-pointer"
          to="category/offers"
        >
          Show more offers
        </Link>
        <ListingsList data={listings?.recentOffers} />
        <h3 className="text-2xl font-bold xl:px-0 px-4 mb-5">Places for rent</h3>
        <Link
          className="block mb-3 text-sm px-4 xl:px-0 text-blue-600 cursor-pointer"
          to="category/rent"
        >
          Show more places for rent
        </Link>
        <ListingsList data={listings?.rent} />
        <h3 className="text-2xl font-bold xl:px-0 px-4 mb-5">Places for sale</h3>
        <Link
          className="block mb-3 text-sm px-4 xl:px-0 text-blue-600 cursor-pointer"
          to="category/sell"
        >
          Show more places for sale
        </Link>
        <ListingsList data={listings?.sell} />
      </div>
    </motion.section>
  );
}

export default HomePage;
