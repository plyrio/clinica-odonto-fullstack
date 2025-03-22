import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";


type ButtonProps = {
    text: string;
    variant?: "blue-white" | "white-blue";
    className?: string;
    href: string;
};

export default function Button({
    text,
    variant = "blue-white",
    className,
    href = "#"
}: ButtonProps) {
    const buttonClass =
        variant === "white-blue"
            ? " hover:text-white shadow-[0_7px_25px_rgba(123,104,238,0.25)] text-blue-600  bg-white "
            : "text-white bg-blue-600";

    return (
        <Link
            href={href}
            type="button"
            className={twMerge(
                `relative inline-block text-center overflow-hidden z-10
                duration-400
               rounded-full font-semibold text-[15px]
               px-9 py-3 mt-[5px] mr-2.5
                border-none hover:bg-indigo-900 ${buttonClass}`,
                className
            )}
        >
            {text}
        </Link>
    );
}
