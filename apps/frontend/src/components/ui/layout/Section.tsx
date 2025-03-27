import React from "react";
import { twMerge } from "tailwind-merge";

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
  noContainer1 = false,
}: SectionLayoutProps) {
  return (
    <section
      className={twMerge(
        `${noContainer ? "" : "container"} py-24 mx-auto`,
        className,
      )}
    >
      <div
        className={twMerge(
          `${noContainer1 ? "" : "container"} mx-auto px-0`,
          classNameContainer,
        )}
      >
        {children}
      </div>
    </section>
  );
}
