import React from "react";
import {twMerge} from "tailwind-merge";

type ButtonDefaultProps = {
  text: string;
  variant?: "blue-white" | "white-blue"; // Define as variações
  className?: string;
};

export default function ButtonDefault({
  text,
  variant = "blue-white",
  className
}: ButtonDefaultProps) {
  const buttonClass =
    variant === "blue-white"
      ? "bg-transparent text-brand-fgprimary hover:bg-brand-bgsubtle hover:text-brand-fgwhite   focus:outline-brand-brand"
      : "bg-brand-bgwhite text-brand-fgprimary hover:bg-brand-bgsubtle    ";

  return (
    <button
      type='button'
      className={twMerge(
        ` relative hover:border-brand-bgwhite hover:border-opacity-90 focus:outline-brand-brand border-4 border-brand-fgprimary border-opacity-20  inline-block text-center overflow-hidden transition duration-400  font-semibold shadow-lg  w-full  px-12 py-3 text-sm focus:ring active:text-opacity-75 sm:w-auto ${buttonClass}`,
        className
      )}>
      {text}
    </button>
  );
}
