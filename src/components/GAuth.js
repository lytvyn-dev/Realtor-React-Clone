import { FcGoogle } from "react-icons/fc";

function GAuth() {
  return (
    <button className="flex items-center justify-center  cursor-pointer bg-red-600 px-7 py-3 w-full hover:bg-red-700 transition ease-out duration-300 hover:shadow-xl active:shadow-xl">
      <FcGoogle className="mr-2 bg-white rounded-full text-xl" /> CONTINUE WITH GOOGLE
    </button>
  );
}

export default GAuth;
