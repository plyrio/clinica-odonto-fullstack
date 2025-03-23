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
    noContainer1 = false
}: SectionLayoutProps) {
    return (
        <section
            className={twMerge(
                `${noContainer ? "" : "container "} py-24 `,
                className
            )}
        >
            <div
                className={twMerge(
                    `${noContainer1 ? "" : "container md:px-3.5 px-0"} `,
                    classNameContainer
                )}
            >
                {children}
            </div>
        </section>
    );
}
