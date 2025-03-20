'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserMenuContextType {
    menuOpenUser: boolean;
    toggleMenuUser: () => void;
    closeMenuUser: () => void;
}

export const UserMenuContext = createContext<UserMenuContextType | undefined>(undefined);

export function UserMenuProvider({ children }: { children: ReactNode }) {
    const [menuOpenUser, setMenuOpenUser] = useState(false);

    const toggleMenuUser = () => setMenuOpenUser((cur) => !cur);
    const closeMenuUser = () => setMenuOpenUser(false);

    return (
        <UserMenuContext.Provider value={{ menuOpenUser, closeMenuUser, toggleMenuUser }}>
            {children}
        </UserMenuContext.Provider>
    );
}