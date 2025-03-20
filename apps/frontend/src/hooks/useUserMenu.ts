'use client';
import { useContext, useEffect, useRef } from 'react';
import { UserMenuContext } from '@/components/context/UserMenuContext';

export function useUserMenu() {
    const context = useContext(UserMenuContext);
    if (!context) {
        throw new Error('useUserMenu deve ser usado dentro de um UserMenuProvider');
    }

    const { menuOpenUser, closeMenuUser, toggleMenuUser } = context;
    const menuRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenuUser()

            }
        }

        if (menuOpenUser) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpenUser]);

    return { menuOpenUser, toggleMenuUser, closeMenuUser, menuRef };
}
