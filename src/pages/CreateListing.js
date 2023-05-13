import { useState } from "react";
import { Form } from "react-router-dom";

function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    beds: "1",
    baths: "1",
    parking: false,
    furnished: false,
    address: "",
    price: "0",
    offer: false,
    description: "",
  });

  const { type, name, beds, baths, parking, furnished, address, offer, description, price } =
    formData;

  const changeFormDataHandler = (e) => {
    setFormData((prevState) => {
      if (e.target.value === "rent") {
      }
      return {
        // ...prevState,
        // [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <div className="py-6">
      <h1 className="text-center text-3xl mb-6 font-black">Create a Listing</h1>
      <Form className="flex flex-col gap-10 max-w-md m-auto">
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-bold text-lg mb-1">Sell/Rent</p>
            <div className="flex gap-4">
              <button
                value={type}
                type="button"
                onChange={changeFormDataHandler}
                className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${
                  type === "rent"
                    ? "text-black bg-gray hover:bg-white focus:bg-white"
                    : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800"
                }`}
              >
                Sell
              </button>
              <button
                onChange={changeFormDataHandler}
                value={type}
                type="button"
                className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${
                  type === "sell"
                    ? "text-black bg-gray hover:bg-white focus:bg-white"
                    : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800"
                }`}
              >
                Rent
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-lg mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="placeholder:text-gray-500 rounded px-4 py-3 border border-gray-300 focus:border-gray-700"
              type="text"
              name="name"
              value={name}
              id="name"
              placeholder="Name"
              onChange={changeFormDataHandler}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col">
              <label className="font-bold text-lg mb-1" htmlFor="bads">
                Beds
              </label>
              <input
                className="placeholder:text-gray-500 text-center rounded px-4 py-3 border border-gray-300 focus:border-gray-700"
                type="number"
                name="beds"
                id="beds"
                value={beds}
                min="1"
                max="50"
                required
                onChange={changeFormDataHandler}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-lg mb-1" htmlFor="baths">
                Baths
              </label>
              <input
                className="placeholder:text-gray-500 text-center rounded px-4 py-3 border border-gray-300 focus:border-gray-700"
                type="number"
                name="baths"
                id="baths"
                value={baths}
                min="1"
                max="50"
                required
                onChange={changeFormDataHandler}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-bold text-lg mb-1">Furnished</p>
            <div className="flex gap-4">
              <button
                onChange={changeFormDataHandler}
                value={furnished}
                type="button"
                className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${
                  !furnished
                    ? "text-black bg-gray hover:bg-white focus:bg-white"
                    : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800"
                }`}
              >
                Yes
              </button>
              <button
                onChange={changeFormDataHandler}
                value={furnished}
                type="button"
                className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${
                  furnished
                    ? "text-black bg-gray hover:bg-white focus:bg-white"
                    : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800"
                }`}
              >
                No
              </button>
            </div>
          </div>
          <div>
            <p className="font-bold text-lg mb-1">Parking spot</p>
            <div className="flex gap-4">
              <button
                onChange={changeFormDataHandler}
                value={parking}
                type="button"
                className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${
                  !parking
                    ? "text-black bg-gray hover:bg-white focus:bg-white"
                    : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800"
                }`}
              >
                Yes
              </button>
              <button
                onChange={changeFormDataHandler}
                value={parking}
                type="button"
                className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${
                  parking
                    ? "text-black bg-gray hover:bg-white focus:bg-white"
                    : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800"
                }`}
              >
                No
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-lg mb-1" htmlFor="address">
              Address
            </label>
            <textarea
              className="placeholder:text-gray-500 rounded px-4 py-2 border border-gray-300"
              placeholder="Address"
              name="address"
              value={address}
              id="address"
              cols="100%"
              rows="2"
              onChange={changeFormDataHandler}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-lg mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              onChange={changeFormDataHandler}
              className="placeholder:text-gray-500 rounded px-4 py-2 border border-gray-300"
              placeholder="Description"
              name="description"
              id="description"
              cols="100%"
              rows="2"
              value={description}
            ></textarea>
          </div>
          <div>
            <p className="font-bold text-lg mb-1">Offer</p>
            <div className="flex gap-4">
              <button
                onChange={changeFormDataHandler}
                value={offer}
                type="button"
                className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${
                  !offer
                    ? "text-black bg-gray hover:bg-white focus:bg-white"
                    : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800"
                }`}
              >
                Yes
              </button>
              <button
                onChange={changeFormDataHandler}
                type="button"
                className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${
                  offer
                    ? "text-black bg-gray hover:bg-white focus:bg-white"
                    : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800"
                }`}
              >
                No
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <label className="font-bold text-lg mb-1" htmlFor="price">
              Regular price
            </label>
            <div className="flex space-x-5 items-center">
              <input
                onChange={changeFormDataHandler}
                className="placeholder:text-gray-500 text-center rounded px-4 py-3 border border-gray-300 focus:border-gray-700"
                type="number"
                name="price"
                id="price"
                value={price}
                min="0"
                max="10000"
                required
              />
              <p className="font-medium">$ / Month</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-lg mb-1">Images</p>
            <p className="text-gray-500 text-sm">The first image will be the cover (max 6).</p>
            <input
              onChange={changeFormDataHandler}
              className="bg-white w-full border border-gray-300 py-1 px-2 focus:border-gray-700"
              type="file"
              name="file"
              id="file"
              max="6"
              accept=".jpg,.png,.jpeg"
              required
              multiple
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white font-medium uppercase cursor-pointer bg-blue-600 w-full px-7 py-3 hover:bg-blue-700 hover:shadow-xl transition ease-in-out duration-300 shadow-xl"
        >
          Create Listing
        </button>
      </Form>
    </div>
  );
}

export default CreateListing;
