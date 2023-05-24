import { MListing } from "./Listing";
import { motion } from "framer-motion";

function ListingsList({ data, onDelete = undefined, onEdit = undefined }) {
  const liVariants = {
    show: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.3 },
    }),
    hidden: {
      opacity: 0,
      y: "20px",
    },
  };

  return (
    <motion.ul className="pb-10 px-4 xl:px-0 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data.map((listing, index) => (
        <MListing
          viewport={{ amount: 0.2, once: true }}
          variants={liVariants}
          initial="hidden"
          whileInView="show"
          custom={index * 0.2}
          onDelete={onDelete}
          onEdit={onEdit}
          key={listing.id}
          id={listing.id}
          data={listing.data}
        />
      ))}
    </motion.ul>
  );
}

export default ListingsList;
