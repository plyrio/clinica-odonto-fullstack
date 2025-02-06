import React from "react";
import Link from "next/link";
import ButtonDefault from "@/components/utils/ButtonDefault";
import { twMerge } from "tailwind-merge";

type HeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
  isHome?: boolean;
  className?: string;
};

export default function Hero({
  title,
  subtitle,
  buttonLabel,
  isHome = false,
  description,
  className = ""
}: HeroProps) {
  return (
    <div className={twMerge(`relative z-10 h-full bg-cover bg-center bg-no-repeat ${isHome ? 'py-[100px] sm:pt-[120px] sm:pb-[100px] md:h-[700px] bg-hero-home' : 'h-[300px] bg-hero-generic'}`, className)}>
      <div className="absolute inset-0 bg-slate-900 opacity-50 -z-10"></div>
      <div className="flex items-center justify-center h-full w-full">
        <div className="container w-full flex mx-auto">
          <div className="flex items-center max-w-6xl mx-auto">
            <div className="col-lg-8 offset-lg-2 col-md-12">
              <div className="text-center">
                <h4 className="text-white text-[20px] font-medium">{subtitle}</h4>
                <h1 className={twMerge(`text-white  font-bold uppercase mb-5 ${isHome ? 'text-[40px] sm:text-[35px] md:text-[60px]' : 'text-[28px] sm:text-[35px] md:text-[38px]'}`)}>{title}</h1>
                <p className="text-white text-[16px] m-0">{description}</p>
                {isHome ? (
                  <div className="mt-[25px]">
                    <ButtonDefault
                      href="/contatos"
                      text={`${buttonLabel}`}
                      variant='white-blue'
                      className="mr-[10px]"></ButtonDefault>
                    <ButtonDefault
                      href="/servicos"
                      text='Nossos Serviços'
                    ></ButtonDefault>
                  </div>) :
                  (<div className='flex mx-auto justify-center items-center'>
                    <Link
                      href='/'
                      className='text-center text-white text-[17px] font-semibold mx-[10px]'>
                      Inicio
                    </Link>
                    <span className='text-center text-blue-600 text-[17px] font-semibold mx-[10px]'> • </span>
                    <span className='text-center text-white text-[17px] font-semibold mx-[10px]'>
                      {title}
                    </span>
                  </div>)


                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
