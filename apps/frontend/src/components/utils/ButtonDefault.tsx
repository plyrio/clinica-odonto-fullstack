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
      ? "bg-transparent  text-brand-secondary hover:bg-brand-h hover:text-brand-a"
      : "bg-brand-accent text-brand-a hover:bg-brand-h";

  return (
    <button
      type='button'
      className={twMerge(
        ` relative hover:border-brand-h border-2 border-solid border-brand-accent inline-block text-center overflow-hidden transition duration-400  font-semibold shadow-lg  w-full rounded-full px-12 py-3 text-sm focus:ring active:text-opacity-75 sm:w-auto ${buttonClass}`,
        className
      )}>
      {text}
    </button>
  );
}
