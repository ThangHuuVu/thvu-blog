interface ButtonProps extends Omit<React.LinkHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "button" | "submit" | "reset";
}

export default function Button({ type = "button", ...rest }: ButtonProps) {
  return (
    <button
      className="px-4 py-2 flex items-center justify-center my-4 font-semibold text-base text-white bg-primary-400 dark:bg-primary-600 hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
      {...rest}
      type={type}
    ></button>
  );
}
