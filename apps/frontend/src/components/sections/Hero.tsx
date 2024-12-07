'use client'
import React from 'react'
import Link from 'next/link'
import ButtonDefault from '@/components/utils/ButtonDefault'
import { twMerge } from 'tailwind-merge';

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

export default function Hero({ title,
  subtitle,
  backgroundClass,
  buttonLabel,
  isHome = false,
  description,
  className = '',
}: HeroProps) {
  
  return (

    <div className={twMerge(` bg-cover bg-no-repeat bg-center ${isHome ? 'h-[565px]' : 'h-[19rem]'} bg-${backgroundClass}`, className)}>
      <div className="flex items-center justify-center h-full relative"  >
        <div className="absolute inset-0 bg-gray-600/40"></div>
        <div className="text-center max-w-screen-sm relative">
          <h2 className="text-white lg:text-2xl py-2">{subtitle}</h2>
          <h1 className="text-3xl font-semibold text-white lg:text-5xl uppercase text-brand-dark">{title}</h1>
          <p className="text-white mt-4">
            {description}
          </p>

          {isHome ? (

            <div className="flex flex-col md:flex-row justify-center items-center py-4 gap-3 md:gap-6">
              <ButtonDefault text={`${buttonLabel}`}></ButtonDefault>
              <ButtonDefault text="Nossos Serviços" variant="white-blue"></ButtonDefault>
            </div>
          ) : (
            <nav className="flex justify-center space-x-4 mt-4">
              <Link href="/" className="text-white text-sm hover:underline">Home</Link>
              <span className="text-white">•</span>
              <span className="text-white text-sm">{title}</span>
            </nav>
          )}
        </div>
      </div>
    </div>

  )
}
