import React from "react";
import {twMerge} from "tailwind-merge";

type SectionLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({children, className}: SectionLayoutProps) {
  return (
    <section className={twMerge(`py-8 mx-auto`, className)}>{children}</section>
  );
}
