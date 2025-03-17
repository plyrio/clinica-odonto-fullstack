'use client'
import { useContext } from "react";
import { NavMenuContext } from "@/context/NavMenuContext";

export function useMenu() {
    const context = useContext(NavMenuContext);
    if (!context) {
        throw new Error('Não um contexto de menu disponível');
    }
    return context;
}