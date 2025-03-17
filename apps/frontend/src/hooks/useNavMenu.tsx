'use client';
import { useContext, useEffect, useRef } from 'react';
import { NavMenuContext } from '@/context/NavMenuContext';

export function useNavMenu() {
    const context = useContext(NavMenuContext);
    if (!context) {
        throw new Error('useNavMenu deve ser usado dentro de um NavMenuProvider');
    }

    const { menuOpen, closeMenu, toggleMenu } = context;
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                toggleMenu();
            }
        }

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside); 
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    return { menuOpen, toggleMenu, closeMenu, menuRef };
}
