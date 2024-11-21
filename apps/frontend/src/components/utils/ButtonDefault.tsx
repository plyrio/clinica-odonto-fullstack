import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonDefaultProps = {
  text: string;
  variant?: 'blue-white' | 'white-blue'; // Define as variações
  className?: string;
};

export default function ButtonDefault({
  text,
  variant = 'blue-white',
  className,
}: ButtonDefaultProps) {
  const buttonClass =
    variant === 'blue-white'
      ? 'bg-white text-brand-primary hover:bg-blue-500'
      : 'bg-brand-primary text-white hover:bg-red-100';

  return (
    <button
      type="button"
      className={twMerge(`border-none relative inline-block text-center overflow-hidden transition duration-400 rounded-full font-semibold text-[15px] px-[35px] py-[12px]  shadow-lg ${buttonClass}`, className)}
    >
      {text}
    </button>
  );
}
