import React from "react";
import clsx from "clsx";

const Button = ({ title, id, leftIcon, rightIcon, containerClass }) => {
  return (
    <button
      type="button"
      id={id}
      className={clsx(
        "group relative z-10 mb-2 me-2 mt-2 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-center font-semibold text-black hover:bg-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-400",
        containerClass,
      )}
    >
      {leftIcon}
      <span
        className="relative inline-flex overflow-hidden font-general text-sm uppercase"
        aria-label="Watch Trailer"
      >
        {title}
      </span>
      {rightIcon}
    </button>
  );
};
export default Button;
