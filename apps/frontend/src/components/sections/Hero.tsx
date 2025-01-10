import React from "react";
import Link from "next/link";
import ButtonDefault from "@/components/utils/ButtonDefault";
import {twMerge} from "tailwind-merge";

type HeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundClass: string;
  buttonLabel?: string;
  buttonLink?: string;
  isHome?: boolean;
  className?: string;
};

export default function Hero({
  title,
  subtitle,
  backgroundClass,
  buttonLabel,
  isHome = false,
  description,
  className = ""
}: HeroProps) {
  return (
    <div
      className={twMerge(
        `relative bg-no-repeat bg-cover z-10 mx-auto  py-32 md:flex md:items-center before:content-[''] before:absolute before:inset-0   before:bg-gradient-to-tl before:from-brand-d before:to-brand-a/50 before:z-0 ${
          isHome ? "bg-center md:h-[750px]" : "max-w-screen-xl h-[19rem]"
        } bg-${backgroundClass}`,
        className
      )}>
      <div className={`relative max-w-3xl`}>
        <h1 className='relative text-3xl font-extrabold text-brand-fgwhite sm:text-5xl '>
          {title}
          <span className='relative text-brand-fgwhite text-start'> {subtitle} </span>
        </h1>

        <p className='relative mt-4 max-w-xl sm:text-xl/relaxed text-brand-fgwhite'>
          {description}
        </p>

        <div className='relative mt-8 flex flex-wrap gap-4'>
          {isHome ? (
            <div className='flex flex-col md:flex-row items-center py-4 gap-3 md:gap-6'>
              <ButtonDefault
                text={`${buttonLabel}`}
                variant='white-blue'></ButtonDefault>
              <ButtonDefault text='Nossos Serviços'></ButtonDefault>
            </div>
          ) : (
            <nav className='flex justify-center space-x-4'>
              <Link
                href='/'
                className='text-brand-neutral text-sm hover:underline'>
                Home
              </Link>
              <span className='text-neutral'>•</span>
              <span className='text-neutral text-sm'>{title}</span>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
