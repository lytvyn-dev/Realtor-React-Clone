//* components
import SubmitButton from "./UI/btns/SubmitButton";
//* react
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
//*pages
import Spinner from "../components/Spinner";
//*firebase
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
//* uuid
import { v4 as uuidv4 } from "uuid";
import ButtonChecked from "./UI/btns/ButtonChecked";
import CheckButton from "./UI/btns/CheckButton";

function Form(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    images: {},
    discount: "0",
    latitude: "",
    longitude: "",
  });

  //* it will rerender only we pass listing data throw props
  useEffect(() => {
    setLoading(true);
    if (props.data) {
      setFormData({ ...props.data });
    }
    setTimeout(() => setLoading(false), 1000);
  }, [props.data]);

  const {
    type,
    name,
    beds,
    baths,
    parking,
    furnished,
    address,
    offer,
    description,
    price,
    images,
    discount,
    longitude,
    latitude,
  } = formData;

  const changeFormDataHandler = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const SubmitFormHandler = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    setLoading(true);
    if (+discount >= +price) {
      toast.error("Discounted price should be less than regular price!", {
        position: "bottom-center",
      });
      return;
    }
    if (images.length > 6) {
      toast.error("maximum 6 images are allowed!", {
        position: "bottom-center",
      });
      return;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch(
      (error) => {
        setLoading(false);
        toast.error("Images not uploaded");
        return;
      }
    );

    const formDataCopy = {
      ...formData,
      imgUrls,
      timeStamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    delete formDataCopy.images;
    !formData.offer && delete formDataCopy.discount;

    if (props.data) {
      setLoading(true);
      const listingsRef = doc(db, "listings", props.listingId);
      await updateDoc(listingsRef, formDataCopy);
      setLoading(false);
      toast.success("Listing was edited!", { position: "bottom-center" });
      navigate(`/category/${type}/${props.listingId}`);
      return;
    }
    console.log(1234);
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created", { position: "bottom-center" });
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) return <Spinner />;

  return (
    <div className="py-6">
      <h1 className="text-center text-3xl mb-6 font-black">
        {props.type === "edit" ? "Edit Listing" : "Create Listing"}
      </h1>
      <form
        onSubmit={SubmitFormHandler}
        method="POST"
        className="flex flex-col gap-10 max-w-md m-auto"
      >
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-bold text-lg mb-1">Sell/Rent</p>
            <div className="flex gap-4">
              <ButtonChecked
                changeTypeHandler={changeFormDataHandler}
                id="type"
                value="sell"
                title="Sell"
                dynamicType={type}
              />
              <CheckButton
                changeTypeHandler={changeFormDataHandler}
                id="type"
                value="rent"
                title="Rent"
                dynamicType={type}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-lg mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="placeholder:text-gray-500 rounded px-4 py-3 border border-gray-300 focus:border-gray-700"
              required
              type="text"
              name="name"
              maxLength="32"
              minLength="10"
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
              <ButtonChecked
                changeTypeHandler={changeFormDataHandler}
                id="furnished"
                value="true"
                title="Yes"
                dynamicType={furnished}
              />
              <CheckButton
                changeTypeHandler={changeFormDataHandler}
                id="furnished"
                value="false"
                title="No"
                dynamicType={furnished}
              />
            </div>
          </div>
          <div>
            <p className="font-bold text-lg mb-1">Parking spot</p>
            <div className="flex gap-4">
              <ButtonChecked
                changeTypeHandler={changeFormDataHandler}
                id="parking"
                value="true"
                title="Yes"
                dynamicType={parking}
              />
              <CheckButton
                changeTypeHandler={changeFormDataHandler}
                id="parking"
                value="false"
                title="No"
                dynamicType={parking}
              />
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
              required
              id="address"
              cols="100%"
              rows="2"
              onChange={changeFormDataHandler}
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col w-full">
              <label className="font-medium text-lg mb-1" htmlFor="latitude">
                Latitude
              </label>
              <input
                id="latitude"
                name="latitude"
                value={latitude}
                onChange={changeFormDataHandler}
                required
                min="-90"
                max="90"
                type="number"
                className="placeholder:text-gray-500 text-center rounded px-4 py-3 border border-gray-300 focus:border-gray-700"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-medium text-lg mb-1" htmlFor="longitude">
                Longitude
              </label>
              <input
                id="longitude"
                name="longitude"
                onChange={changeFormDataHandler}
                value={longitude}
                required
                type="number"
                min="-180"
                max="180"
                className="placeholder:text-gray-500 text-center rounded px-4 py-3 border border-gray-300 focus:border-gray-700"
              />
            </div>
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
              <ButtonChecked
                changeTypeHandler={changeFormDataHandler}
                id="offer"
                value="true"
                title="Yes"
                dynamicType={offer}
              />
              <CheckButton
                changeTypeHandler={changeFormDataHandler}
                id="offer"
                value="false"
                title="No"
                dynamicType={offer}
              />
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
                min="50"
                max="400000"
                required
              />
              {formData.type === "rent" && <p className="font-medium">$ / Month</p>}
            </div>
          </div>
          {offer && (
            <div className="flex flex-col items-start">
              <label className="font-bold text-lg mb-1" htmlFor="discount">
                Discounted price
              </label>
              <div className="flex space-x-5 items-center">
                <input
                  onChange={changeFormDataHandler}
                  className="placeholder:text-gray-500 text-center rounded px-4 py-3 border border-gray-300 focus:border-gray-700"
                  type="number"
                  name="discount"
                  id="discount"
                  value={discount}
                  min="49"
                  max="10000"
                  required
                />
                {formData.type === "rent" && <p className="font-medium">$ / Month</p>}
              </div>
            </div>
          )}

          <div>
            <p className="font-bold text-lg mb-1">Images</p>
            <p className="text-gray-500 text-sm">The first image will be the cover (max 6).</p>
            <input
              onChange={changeFormDataHandler}
              className="bg-white w-full border border-gray-300 py-1 px-2 focus:border-gray-700"
              type="file"
              name="images"
              id="images"
              max="6"
              accept=".jpg,.png,.jpeg"
              required
              multiple
            />
          </div>
        </div>
        <SubmitButton value={props.type === "edit" ? "Edit Listing" : "Create Listing"} />
      </form>
    </div>
  );
}

export default Form;
