function ButtonChecked(props) {
  const styles =
    props.dynamicType === "rent" || props.dynamicType === false
      ? "text-black bg-gray hover:bg-white focus:bg-white"
      : "text-white bg-gray-600 hover:bg-gray-800 focus:bg-gray-800";

  return (
    <button
      type="button"
      id={props.id}
      value={props.value}
      onClick={props.changeTypeHandler}
      className={`uppercase w-full font-medium text-sm  px-1 py-3 rounded shadow-xl transition ease-in-out duration-300 ${styles}`}
    >
      {props.title}
    </button>
  );
}

export default ButtonChecked;
