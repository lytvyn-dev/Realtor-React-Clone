import Listing from "./Listing";
function ListingsList({ data }) {
  return (
    <ul className="pb-10 px-4 sm:px-0 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data.map((listing, el) => (
        <Listing key={listing.id} id={listing.id} data={listing.data} />
      ))}
    </ul>
  );
}

export default ListingsList;
