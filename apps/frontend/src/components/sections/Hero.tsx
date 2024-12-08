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
        `relative bg-no-repeat bg-contain bg-cover z-10 mx-auto  py-32 md:flex md:items-center before:content-[''] before:absolute before:inset-0   before:bg-gradient-to-tl before:from-brand-d before:to-brand-a/50 before:z-0 ${
          isHome ? "bg-center md:h-[450px]" : "max-w-screen-xl h-[19rem]"
        } bg-${backgroundClass}`,
        className
      )}>
      <div className={`relative mx-auto max-w-3xl text-center justify-center `}>
        <h1 className='relative text-3xl font-extrabold text-brand-primary sm:text-5xl'>
          {title}
          <span className='relative text-brand-primary'> {subtitle} </span>
        </h1>

        <p className='relative mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-brand-neutral'>
          {description}
        </p>

        <div className='relative mx-auto mt-8 flex flex-wrap justify-center gap-4'>
          {isHome ? (
            <div className='flex flex-col md:flex-row justify-center items-center py-4 gap-3 md:gap-6'>
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
