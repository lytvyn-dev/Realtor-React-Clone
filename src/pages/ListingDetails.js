import { MdKingBed, MdLocationOn } from "react-icons/md";
import { TbBathFilled } from "react-icons/tb";
import { RiParkingBoxFill } from "react-icons/ri";
import { FaChair } from "react-icons/fa";
//* react
import { Fragment, useState } from "react";
import { useParams } from "react-router";
//* components
import SubmitButton from "../components/UI/btns/SubmitButton";
import Spinner from "../components/Spinner";
//* hooks
import { useFetchListingID } from "../hooks/useFetchListingID";

function ListingDetails() {
  const { listingId } = useParams();
  const [showForm, setShowForm] = useState();

  const { listing, loading } = useFetchListingID(listingId);

  if (loading) return <Spinner />;
  return (
    <section className="h-screen flex flex-col gap-5 pb-52">
      <div className="h-[300px] bg-pink-300 flex justify-center items-center text-3xl">Slider</div>
      <div className="bg-white shadow-lg h-[500px] container mx-auto flex gap-4 pt-10 pb-5 px-3">
        <div className="basis-1/2 flex flex-col gap-4">
          <p className="text-2xl font-bold text-blue-900">title</p>
          <address className="flex items-center gap-1">
            <MdLocationOn />
          </address>
          <div className="flex gap-3">
            <div className="text-white  font-bold bg-red-700 rounded py-1 w-[160px] text-center">
              For Rent
            </div>
            <div className="text-white  font-bold bg-green-700 rounded py-1 w-[160px] text-center">
              $97 discount
            </div>
          </div>
          <p>
            <span className="font-bold">Description</span> - Deserunt asperiores quia nulla
            incididunt qui ad officiis ex dolor pariatur Do minima exercitationem ut explicabo
            Provident
          </p>
          <div className="flex gap-5 text-xl">
            <MdKingBed />
            <TbBathFilled />
            <RiParkingBoxFill />
            <FaChair />
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="uppercase w-full bg-blue-500 text-white py-3 font-semibold"
            >
              Contact landlord
            </button>
          )}
          {showForm && (
            <Fragment>
              <p>Contact name for the nameOfHouse</p>
              <textarea
                className="placeholder:text-gray-500 rounded px-4 py-2 border border-gray-300 w-full"
                name="message"
                id="message"
                cols="100%"
                rows="2"
                placeholder="Message"
              ></textarea>
              <SubmitButton value="Send message" />
            </Fragment>
          )}
        </div>
        <div className="basis-1/2 bg-gray-300"></div>
      </div>
    </section>
  );
}

export default ListingDetails;
