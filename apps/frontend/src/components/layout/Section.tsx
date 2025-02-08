import React from "react";
import { twMerge } from "tailwind-merge";

type SectionLayoutProps = {
  children: React.ReactNode;
  className?: string;
  noContainer?: boolean;

};

export default function Section({ children, className, noContainer = false }: SectionLayoutProps) {
  return (
    <section className={twMerge(`${noContainer ? '' : 'lg:container'}  px-6 py-[100px] mx-auto`, className)}>
      {children}
    </section>
  );
}
