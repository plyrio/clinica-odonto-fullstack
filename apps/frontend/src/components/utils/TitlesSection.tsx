import React from 'react';
import { twMerge } from "tailwind-merge";

type TitlesSectionProps = {
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
  titleClassName?: string;
}

export default function TitlesSection({ title, subtitle, subtitleClassName, titleClassName }: TitlesSectionProps) {
  return (
    <div className="mb-[35px] text-center leading-[1.5]">
      <h6 className={twMerge(`text-[16px] text-blue-600 leading-[1] mb-[15px] font-semibold`, subtitleClassName)}>{subtitle}</h6>
      <h2 className={twMerge(`text-[30px] md:text-[35px] font-bold text-zinc-600 m-0 leading-[1.4]`, titleClassName)}>{title}</h2>
      <div className="flex justify-center mx-auto mt-6">
        <span className="inline-block w-40 h-1 bg-blue-600 rounded-full"></span>
        <span className="inline-block w-3 h-1 mx-1 bg-blue-600 rounded-full"></span>
        <span className="inline-block w-1 h-1 bg-blue-600 rounded-full"></span>
      </div>
    </div>



  )
}

