import React from 'react';
import { twMerge } from 'tailwind-merge'; 

type GridContainerProps = {
    children: React.ReactNode;
    className?: string; 
    gridClassName?: string; 
};

export function CardContainer({ children, className, gridClassName }: GridContainerProps) {
    const defaultContainerClasses = 'container w-full mx-auto';
    const defaultGridClasses = 'grid grid-cols-1 gap-6 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 mt-12 mx-auto justify-item-center ';
    return (
        <div className={twMerge(defaultContainerClasses, className)}>
            <div className={twMerge(defaultGridClasses, gridClassName)}>
                {children}
            </div>
        </div>
    );
}

