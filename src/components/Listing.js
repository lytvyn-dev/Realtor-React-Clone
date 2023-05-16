import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
//* react
import { Link } from "react-router-dom";

function Listing({ id, data }) {
  return (
    <li className="flex flex-col justify-between transition-shadow duration-300 list-none bg-white shadow-md hover:shadow-lg overflow-hidden rounded">
      <Link to={`/category/${data.type}/${id}`} className="overflow-hidden">
        <img
          loading="lazy"
          className="h-[170px] object-cover hover:scale-110 transition-transform duration-300"
          src={data.imgUrls}
          alt={data.description}
        />
      </Link>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-sm font-semibold flex items-center gap-2 truncate text-gray-500">
          <HiLocationMarker className="fill-green-600" />
          {data.address}
        </p>
        <p className="text-xl text-blue-700 font-semibold truncate">{data.description}</p>
        <p className="text-green-700 font-semibold text-lg">${data.price} / Month</p>
        <div className="flex justify-between">
          <div className="font-bold text-xs">
            {data.beds} Beds {data.baths} Baths
          </div>
          <div className="flex gap-2">
            <MdModeEditOutline className="cursor-pointer" />
            <FaTrash className="cursor-pointer fill-red-600" />
          </div>
        </div>
      </div>
    </li>
  );
}

export default Listing;
