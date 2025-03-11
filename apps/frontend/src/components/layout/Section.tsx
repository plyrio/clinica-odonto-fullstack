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
    <section className={twMerge(`${noContainer ? 'px-0 py-24' : 'container py-24'} w-full mx-auto `, className)}>
      <div className={twMerge(`${noContainer ? 'px-0' : 'container '} w-full  mx-auto`, classNameContainer)}>
      {children}
      </div>
    </section>
  );
}
