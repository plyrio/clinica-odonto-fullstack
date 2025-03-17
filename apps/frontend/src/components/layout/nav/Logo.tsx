import Link from 'next/link';
import Image from 'next/image';
import {
 LOGO,
 LOGO_DARK,
 CLINIC_INFO,
} from '@/data/Data';
import {twMerge} from 'tailwind-merge';

type LogoProps = {
 className?: string;
 isBgDark?: boolean;
};

export default function Logo({
 className,
 isBgDark = false,
}: LogoProps) {
 return (
  <Link
   href='/'
   className={twMerge(
    `flex text-gray-700 font-bold items-center w-full h-[60%]`,
    className
   )}>
   <span className='sr-only'>
    {' '}
    Home{' '}
   </span>
   <Image
    src={
     isBgDark
      ? LOGO_DARK
      : LOGO
    }
    height={250}
    width={250}
    className='flex h-full w-auto items-center'
    alt='Logo da Clinica Odonto'
   />
  </Link>
 );
}
