import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
//* react
import { Link } from "react-router-dom";
//* react moment
import Moment from "react-moment";

function Listing({ id, data }) {
  return (
    <li className="flex flex-col justify-between transition-shadow duration-300 list-none bg-white shadow-md hover:shadow-lg overflow-hidden rounded">
      <Link to={`/category/${data.type}/${id}`} className="overflow-hidden relative">
        <img
          loading="lazy"
          className="h-[170px] object-cover hover:scale-110 transition-transform duration-300"
          src={data.imgUrls}
          alt={data.description}
        />
        <Moment
          className="text-xs uppercase absolute top-2 left-2 text-white font-semibold bg-blue-600 rounded py-1 px-2"
          fromNow
        >
          {data.timeStamp?.toDate()}
        </Moment>
      </Link>

      <div className="p-3 flex flex-col gap-1">
        <p className="text-sm font-semibold flex items-center gap-2 truncate text-gray-500">
          <HiLocationMarker className="fill-green-600" />
          {data.address}
        </p>
        <p className="text-xl text-blue-700 font-semibold truncate">{data.description}</p>
        <p className="text-green-700 font-semibold text-lg">
          ${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          {data.type === "rent" && " / Month"}
        </p>
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
