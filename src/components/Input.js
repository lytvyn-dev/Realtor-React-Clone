function Input({
  type = "text",
  placeholder = undefined,
  name = undefined,
  id = undefined,
  onChange,
  value = undefined,
}) {
  return (
    <input
      className="py-2 px-4 bg-white border-violet-400 border w-full mb-6"
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
    />
  );
}

export default Input;
