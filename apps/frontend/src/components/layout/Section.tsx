import React from "react";
import {twMerge} from "tailwind-merge";

type SectionLayoutProps = {
  children: React.ReactNode;
  className?: string;
  noContainer?: boolean;
  noContainer1?: boolean;
  classNameContainer?: string;
};

export default function Section({
  children,
  className,
  classNameContainer,
  noContainer = false,
  noContainer1 = false
}: SectionLayoutProps) {
  return (
    <section
      className={twMerge(
        `${noContainer ? "py-24" : "container py-24 md:px-6"} px-0 w-full mx-auto `,
        className
      )}>
      <div
        className={twMerge(
          `${noContainer1 ? "px-0" : "container "} w-full  mx-auto`,
          classNameContainer
        )}>
        {children}
      </div>
    </section>
  );
}
