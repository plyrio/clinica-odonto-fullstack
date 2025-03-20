import React from "react";
import { twMerge } from "tailwind-merge";

type TitlesSectionProps = {
    title: string | React.ReactNode;
    subtitle?: string;
    subtitleClassName?: string;
    titleClassName?: string;
    baseClassName?: string;
};

export default function TitlesSection({
    title,
    subtitle,
    subtitleClassName,
    titleClassName,
    baseClassName
}: TitlesSectionProps) {
    return (
        <div className="mb-9 text-center leading-6">
            <h6
                className={twMerge(
                    `text-base text-blue-600 mb-4 font-semibold`,
                    subtitleClassName
                )}
            >
                {subtitle}
            </h6>
            <h2
                className={twMerge(
                    `text-3xl md:text-4xl font-bold text-zinc-600 m-0 leading-base`,
                    titleClassName
                )}
            >
                {title}
            </h2>
            <div
                className={twMerge(
                    `flex justify-center mx-auto mt-6`,
                    baseClassName
                )}
            >
                <span className="inline-block w-40 h-1 bg-blue-600 rounded-full"></span>
                <span className="inline-block w-3 h-1 mx-1 bg-blue-600 rounded-full"></span>
                <span className="inline-block w-1 h-1 bg-blue-600 rounded-full"></span>
            </div>
        </div>
    );
}
