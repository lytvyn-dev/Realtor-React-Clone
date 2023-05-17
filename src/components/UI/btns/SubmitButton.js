function SubmitButton({ value }) {
  return (
    <button
      type="submit"
      className="text-white font-medium uppercase cursor-pointer bg-blue-600 w-full px-7 py-3 hover:bg-blue-700 hover:shadow-xl transition ease-in-out duration-300 shadow-xl"
    >
      {value}
    </button>
  );
}

export default SubmitButton;
