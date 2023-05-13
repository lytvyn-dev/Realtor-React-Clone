import spinner from "../assets/img/spinner.svg";

function Spinner() {
  return (
    <div className="bg-white fixed w- top-0 left-0 right-0 bottom-0 flex justify-center items-center z-40">
      <img className=" h-24" src={spinner} alt="spinner" />
    </div>
  );
}

export default Spinner;
