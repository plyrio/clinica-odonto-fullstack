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
        `relative bg-no-repeat bg-cover z-10 mx-auto px-6 md:flex flex-col items-center justify-start md:items-start before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/50 before:via-black/20 before:to-transparent ${
          isHome ? "bg-center h-[425px]" : "h-[320px]"
        } bg-${backgroundClass}`,
        className
      )}>
      <div
        className={` relative flex flex-col py-32 lg:container ${
          isHome ? "  lg:mx-auto items-center md:items-start" : " items-center"
        }`}>
        <h1 className=' relative flex flex-row text-center md:text-start text-3xl font-bold text-brand-fgwhite sm:text-4xl drop-shadow-lg max-w-md'>
          {title}
          <span className='relative flex flex-row text-brand-fgwhite max-w-md'>
            {" "}
            {subtitle}{" "}
          </span>
        </h1>

        <p className='relative flex mt-4 max-w-md sm:text-xl/relaxed text-brand-fgwhite drop-shadow-lg text-center md:text-start'>
          {description}
        </p>

        <div className='relative mt-8 flex items-center gap-4'>
          {isHome ? (
            <div className='flex flex-col md:flex-row items-center md:mx-0 mx-auto gap-3 md:gap-6'>
              <ButtonDefault
                text={`${buttonLabel}`}
                variant='white-blue'></ButtonDefault>
              {/*  <ButtonDefault text='Nossos Serviços'></ButtonDefault> */}
            </div>
          ) : (
            <nav className='flex mx-auto gap-4'>
              <Link
                href='/'
                className='text-center text-brand-fgwhite text-md drop-shadow-lg hover:underline'>
                Inicio
              </Link>
              <span className='text-brand-fgwhite drop-shadow-lg'>•</span>
              <span className='text-brand-fgwhite text-md drop-shadow-lg'>
                {title}
              </span>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
