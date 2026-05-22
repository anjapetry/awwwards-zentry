import clsx from "clsx";

const Button = ({
  title,
  id,
  leftIcon,
  rightIcon,
  containerClass,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      id={id}
      className={clsx(
        "group relative z-10 mb-2 me-2 mt-2 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-center font-semibold tracking-wide text-black hover:bg-teal-100 focus:ring-4 focus:ring-teal-400",
        containerClass,
      )}
      {...props}
    >
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span className="relative inline-flex overflow-hidden font-general text-sm uppercase">
        {title}
      </span>
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  );
};
export default Button;
