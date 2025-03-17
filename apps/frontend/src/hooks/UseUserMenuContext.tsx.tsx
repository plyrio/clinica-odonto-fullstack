'use client'
import { UserMenuContext } from "@/context/UserMenuContext";
import { useContext } from "react";


export function useMenu() {
    const context = useContext(UserMenuContext);
    if (!context) {
        throw new Error('Não há um contexto de menu disponível');
    }
    return context;
}