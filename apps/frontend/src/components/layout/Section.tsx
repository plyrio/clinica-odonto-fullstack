import React from "react";
import { twMerge } from "tailwind-merge";

type SectionLayoutProps = {
  children: React.ReactNode;
  className?: string;
  noContainer?: boolean;
  classNameContainer?: string;
};

export default function Section({ children, className, classNameContainer, noContainer = false }: SectionLayoutProps) {
  return (
    <section className={twMerge(`w-full py-24 mx-auto `, className)}>
      <div className={twMerge(`${noContainer ? 'px-0' : 'container px-4'} w-full  mx-auto`, classNameContainer)}>
      {children}
      </div>
    </section>
  );
}
