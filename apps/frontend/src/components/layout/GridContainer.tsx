import React from 'react';
import { twMerge } from 'tailwind-merge'; 

type GridContainerProps = {
    children: React.ReactNode;
    className?: string; 
    gridClassName?: string; 
};

export default function GridContainer({ children, className, gridClassName }: GridContainerProps) {
    const defaultContainerClasses = 'p-6 mx-auto justify-center';
    const defaultGridClasses = 'flex flex-wrap items-center justify-center gap-8 mt-8 md:mt-16 ';
    return (
        <div className={twMerge(defaultContainerClasses, className)}>
            <div className={twMerge(defaultGridClasses, gridClassName)}>
                {children}
            </div>
        </div>
    );
}

