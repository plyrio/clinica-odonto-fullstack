import React from "react";
import { twMerge } from "tailwind-merge";

type SectionLayoutProps = {
  children: React.ReactNode;
  className?: string;

};

export default function Section({ children, className }: SectionLayoutProps) {
  return (
    <section className={twMerge(`lg:container px-6 py-[100px] mx-auto`, className)}>
      {children}
    </section>
  );
}
