'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserMenuContextType {
    menuOpenUser: boolean;
    toggleMenuUser: () => void;
}

export const UserMenuContext = createContext<UserMenuContextType | undefined>(undefined);

export function UserMenuProvider({ children }: { children: ReactNode }) {
    const [menuOpenUser, setMenuOpenUser] = useState(false);

    const toggleMenuUser = () => setMenuOpenUser((cur) => !cur);

    return (
        <UserMenuContext.Provider value={{ menuOpenUser, toggleMenuUser }}>
            {children}
        </UserMenuContext.Provider>
    );
}