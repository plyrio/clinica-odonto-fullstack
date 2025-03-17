'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface NavMenuContextType {
    menuOpen: boolean;
    toggleMenu: () => void;
}

export const NavMenuContext = createContext<NavMenuContextType | undefined>(undefined);

export function NavMenuProvider({ children }: { children: ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((cur) => !cur);

    return (
        <NavMenuContext.Provider value={{ menuOpen, toggleMenu }}>
            {children}
        </NavMenuContext.Provider>
    );
}