import Form from "../components/Form";
//* firebase
import { useParams } from "react-router";
//* hooks

function EditListing() {
  const { listingId } = useParams();

  return <Form type={"edit"} listingId={listingId} />;
}

export default EditListing;
