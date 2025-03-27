import Link from "next/link";
import Image from "next/image";
import { LOGO, LOGO_DARK } from "@/data/Data";
import { twMerge } from "tailwind-merge";

type LogoProps = {
  classNameLink?: string;
  classNameImg?: string;
  isBgDark?: boolean;
};

export default function Logo({
  classNameLink,
  classNameImg,
  isBgDark = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={twMerge(
        `flex text-gray-700 font-bold items-center h-[60%]`,
        classNameLink,
      )}
    >
      <span className="sr-only">Inicio</span>
      <Image
        src={isBgDark ? LOGO_DARK : LOGO}
        height={250}
        width={250}
        className={twMerge(`flex h-full w-auto items-center`, classNameImg)}
        alt="Logo da Clinica Odonto"
      />
    </Link>
  );
}
