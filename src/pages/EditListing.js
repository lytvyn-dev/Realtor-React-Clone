import Form from "../components/Form";
//* firebase
import { useParams } from "react-router";

function EditListing() {
  const { listingId } = useParams();

  return (
    <section>
      <Form type={"edit"} listingId={listingId} />
    </section>
  );
}

export default EditListing;
