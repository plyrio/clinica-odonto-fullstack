import Link from "next/link";
import React from "react";
import ButtonDefault from "../utils/ButtonDefault";
import Image from "next/image";
import {twMerge} from "tailwind-merge";

type CardBaseProps = {
  imageSrc: string;
  title: string;
  description?: string;
  cardClass?: string;
  buttonText?: string;
  linkHref?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
};

export default function CardBase({
  imageSrc,
  title,
  description,
  cardClass,
  buttonText,
  linkHref,
  imageWidth = 32,
  imageHeight = 32,
  imageClassName
}: CardBaseProps) {
  return (
    <div
      className={twMerge(
        `relative min-h-80 w-full flex items-center bg-white shadow-sm border border-slate-200 rounded-lg p-2`,
        cardClass
      )}>
      <div className='p-3'>
        <div className='flex justify-center mb-4'>
          <Image
            src={imageSrc}
            width={imageWidth}
            height={imageHeight}
            alt={title}
            className={twMerge(`w-auto h-auto`, imageClassName)}
          />
        </div>
        <h5 className='text-slate-800 text-2xl font-semibold'>{title}</h5>
        {description && (
          <p className='text-slate-600 leading-normal font-light mb-4 max-w-lg'>
            {description}
          </p>
        )}
        {buttonText && linkHref && (
          <Link href={linkHref} className='flex'>
            <ButtonDefault text={buttonText} variant='white-blue' />
          </Link>
        )}
      </div>
    </div>
  );
}
