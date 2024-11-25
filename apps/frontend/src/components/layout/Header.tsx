"use client";
import React, { useState } from "react";
import ButtonDefault from "../utils/ButtonDefault";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LOGO, CLINIC_INFO } from "@/data/Data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <nav className="sticky bg-white shadow w-full top-0 start-0  mx-auto z-50">
      <div className="container px-6 py-4 mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link href="#" className="flex items-center space-x-3">
              <Image src={LOGO} height={32} width={32} alt="Clinica Logo Alt" />
              <span className="self-center text-base md:font-semibold  whitespace-nowrap">
                {CLINIC_INFO.name}
              </span>
            </Link>

            {/*Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={handleOpen}
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-expanded={open}
                aria-controls="menu-open"
                aria-label="toggle menu"
              >
                {!open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" w-6 h-6"
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
                    x-xmlns="http://www.w3.org/2000/svg"
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

          {/*Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`${open ? `translate-x-0 opacity-100` : `opacity-0 -translate-x-full`} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8  md:flex-row md:mt-0 md:border-0 md:items-center">
              <li className="transition-colors duration-300 transform rounded-md md:mt-0 hover:bg-gray-100 p-3">
                <Link
                  href="/"
                  className={`block py-2    rounded md:bg-transparent  ${pathname === "/" ? " md:text-brand-primary" : " text-gray-900"} md:p-0`}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  Início
                </Link>
              </li>
              <li className="transition-colors duration-300 transform rounded-md md:mt-0 hover:bg-gray-100 p-3">
                <Link
                  href="/sobre"
                  className={`block py-2    rounded md:bg-transparent ${pathname === "/sobre" ? " md:text-brand-primary" : " text-gray-900"} md:p-0`}
                  aria-current={pathname === "/sobre" ? "page" : undefined}
                >
                  Sobre
                </Link>
              </li>
              <li className="transition-colors duration-300 transform rounded-md md:mt-0 hover:bg-gray-100 p-3">
                <Link
                  href="/servicos"
                  className={`block py-2    rounded md:bg-transparent ${pathname === "/servicos" ? " md:text-brand-primary" : " text-gray-900"} md:p-0`}
                  aria-current={pathname === "/servicos" ? "page" : undefined}
                >
                  Serviços
                </Link>
              </li>
              <li className="transition-colors duration-300 transform rounded-md md:mt-0 hover:bg-gray-100 p-3">
                <Link
                  href="/profissionais"
                  className={`block py-2   rounded md:bg-transparent ${pathname === "/profissionais" ? " md:text-brand-primary" : " text-gray-900"} md:p-0`}
                  aria-current={
                    pathname === "/profissionais" ? "page" : undefined
                  }
                >
                  Profissionais
                </Link>
              </li>
              <li className="transition-colors duration-300 transform rounded-md md:mt-0 hover:bg-gray-100 p-3">
                <Link
                  href="/blog"
                  className={`block py-2    rounded md:bg-transparent ${pathname === "/blog" ? " md:text-brand-primary" : " text-gray-900"} md:p-0`}
                  aria-current={pathname === "/blog" ? "page" : undefined}
                >
                  Blog
                </Link>
              </li>
              <li className="transition-colors duration-300 transform rounded-md md:mt-0 hover:bg-gray-100 p-3">
                <Link
                  href="/contatos"
                  className={`block py-2   rounded md:bg-transparent ${pathname === "/contatos" ? " md:text-brand-primary" : " text-gray-900"} md:p-0`}
                  aria-current={pathname === "/contatos" ? "page" : undefined}
                >
                  Contatos
                </Link>
              </li>
            </ul>

            <div className="flex items-center mt-4 md:mt-0 md:ms-12">
              <ButtonDefault
                text="Agendamento"
                variant="white-blue"
                className="me-2"
              />

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
}
