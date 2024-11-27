"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LOGO, CLINIC_INFO } from "@/data/Data";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        name: "Início",
        href: "/",
    },
    {
        name: "Serviços",
        href: "/servicos",
    },
    {
        name: "Mais",
        href: "",
        dropDown: [
            {
                name: "Sobre Nós",
                href: "/sobre",
            },
            {
                name: "Profissionais",
                href: "/profissionais",
            },
            {
                name: "Blog",
                href: "/blog",
            },
        ],
    },
    {
        name: "Contato",
        href: "/contatos",
    },
];

export const Nav = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [drop, setDrop] = useState(false);
    const handleDrop = () => setDrop((cur) => !cur);


    return (
        <nav className="sticky bg-white shadow w-full top-0 start-0  mx-auto z-50">
            <div className="container mx-auto px-6 py-4 md:py-0 md:px-0">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex items-center justify-between">
                        <Link href="#" className="flex items-center">
                            <Image
                                src={LOGO}
                                height={32}
                                width={32}
                                className="w-auto"
                                alt="Clinica Logo Alt"
                            />
                            <span className="self-center text-base md:font-semibold  whitespace-nowrap">
                                {CLINIC_INFO.name}
                            </span>
                        </Link>

                        {/* Mobile menu button */}
                        <div className="flex md:hidden">
                            <button
                                type="button"
                                onClick={handleOpen}
                                aria-expanded={open}
                                aria-controls="toggle-menu"
                                className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600"
                                aria-label="toggle menu"
                            >
                                {!open ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 8h16M4 16h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                    <div
                        className={`${open ? `translate-x-0 opacity-100` : `opacity-0 -translate-x-full`} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
                        id="toggle-menu"
                    >
                        <ul className="flex flex-col -mx-6 md:flex-row md:items-center md:mx-8">
                            {navLinks.map((link) => (
                                <li key={link.name} onClick={link.name === "Mais" ? handleDrop : undefined}
                                      
                                    className={`px-3 py-2 mx-3 md:mx-0 my-1 transition-colors duration-300 tranform rounded-md hover:md:bg-gray-100  ${pathname === link.href ? " md:text-brand-primary" : " text-gray-700"}`}
                                    aria-current={pathname === link.href ? "page" : undefined} > 
                                    <Link
        
                                        href={link.href}
                                        className={`flex inline-flex px-3 py-2 mx-3 md:mx-0 my-1 transition-colors duration-300 tranform rounded-md hover:bg-gray-100  ${pathname === link.href ? " md:text-brand-primary" : " text-gray-700"}`}
                                        aria-current={pathname === link.href ? "page" : undefined}
                                    >
                                        {link.name}
                                        {link.name === 'Mais' ? (
                                            <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                                            </svg> 
                                        ) : null }
                                    </Link>
                                    {link.dropDown ? (
                                        <ul id="dropDownMenu" className={`${drop ? `translate-x-0 opacity-100` : `opacity-0 -translate-x-full hidden`} flex md:absolute md:bg-white md:rounded md:shadow `}>
                                            <div className="flex flex-col">

                                                {link.dropDown.map((subLink) => (
                                                    <Link
                                                        key={subLink.name}
                                                        href={subLink.href}
                                                        className={`px-3 py-2 mx-3 ms-2 md:ms-0 md:mx-0 my-1 transition-colors duration-300 tranform rounded-md hover:bg-gray-100  ${pathname === subLink.href ? " md:text-brand-primary" : " text-gray-700"}`}
                                                    >
                                                        {subLink.name}
                                                    </Link>

                                                ))}
                                            </div>

                                        </ul>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                        <hr className="my-1 md:hidden"></hr>
                        <div className="flex items-center mt-md:mt-0">
                            <button
                                className="hidden mx-4 text-gray-600 transition-colors duration-300 transform md:block hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                                aria-label="show notifications"
                            >
                                <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            <button
                                type="button"
                                className="flex items-center focus:outline-none"
                                aria-label="toggle profile dropdown"
                            >
                                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                    <img
                                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                        className="object-cover w-full h-full"
                                        alt="avatar"
                                    />
                                </div>

                                <h3 className="mx-2 text-gray-700 md:hidden">Khatab wedaa</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
