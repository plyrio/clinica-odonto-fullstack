import React from "react";
import { twMerge } from "tailwind-merge";

type GridContainerProps = {
  children: React.ReactNode;
  className?: string;
  gridClassName?: string;
};

export function CardContainer({
  children,
  className,
  gridClassName,
}: GridContainerProps) {
  const defaultContainerClasses = " w-full mx-auto";
  const defaultGridClasses =
    "grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3";
  return (
    <div className={twMerge(defaultContainerClasses, className)}>
      <div className={twMerge(defaultGridClasses, gridClassName)}>
        {children}
      </div>
    </div>
  );
}
