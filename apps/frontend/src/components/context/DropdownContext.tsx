'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface DropdownContextType {
    openMenus: Record<string, boolean>;
    toggleMenu: (menuName: string) => void;
    closeMenu: (menuName: string) => void;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function DropdownProvider({ children }: { children: ReactNode }) {
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (menuName: string) => {
        setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
    };

    const closeMenu = (menuName: string) => {
        setOpenMenus((prev) => ({ ...prev, [menuName]: false }));
    };

    return (
        <DropdownContext.Provider value={{ openMenus, toggleMenu, closeMenu }}>
            {children}
        </DropdownContext.Provider>
    );
}