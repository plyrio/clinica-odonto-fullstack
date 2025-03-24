'use client';
import { useContext, useEffect, useRef } from 'react';
import { DropdownContext } from '@/components/context/DropdownContext';

export function useDropdown(menuName: string) {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('useDropdown deve ser usado dentro de um DropdownProvider');
    }

    const { openMenus, closeMenu, toggleMenu } = context;
    const menuRef = useRef<HTMLDivElement>(null);
    const menuOpen = openMenus[menuName] || false;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu(menuName);
            }
        }

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    return { menuOpen, toggleMenu: () => toggleMenu(menuName), closeMenu: () => closeMenu(menuName), menuRef };
}