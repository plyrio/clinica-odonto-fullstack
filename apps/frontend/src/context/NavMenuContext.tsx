'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface NavMenuContextType {
    menuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
}

export const NavMenuContext = createContext<NavMenuContextType | undefined>(undefined);

export function NavMenuProvider({ children }: { children: ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((cur) => !cur);
    const closeMenu = () => setMenuOpen(false);

    return (
        <NavMenuContext.Provider value={{ menuOpen, closeMenu, toggleMenu }}>
            {children}
        </NavMenuContext.Provider>
    );
}