import React from "react";
import {twMerge} from "tailwind-merge";

type SectionLayoutProps = {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
};

export default function Section({
  children,
  className,
  mainClassName
}: SectionLayoutProps) {
  return (
    <section className={twMerge(`py-8`, className)}>
      <div className={twMerge(`max-w-screen-xl mx-auto`, mainClassName)}>
        {children}
      </div>
    </section>
  );
}
