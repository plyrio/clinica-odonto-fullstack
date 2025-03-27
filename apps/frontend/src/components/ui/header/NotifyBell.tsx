import { IconBell } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { User } from "next-auth";
import { useDropdown } from "@/hooks/useDropdown";

type Props = {
  user: User;
};

export default function NotifyBell({ user }: Props) {
  const { menuOpen, toggleMenu, menuRef } = useDropdown("notifyMenu");

  return (
    <>
      <div className="relative flex justify-self-center" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="relative z-10 text-gray-700 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300  focus:ring focus:outline-none"
        >
          <IconBell stroke={2} className="text-gray-700" />
          <div className="absolute font-bold top-0 right-0 -mt-2 -mr-2 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center text-xs text-white">
            1
          </div>
        </button>

        <div
          className={`${menuOpen ? "absolute right-0 top-5 z-20 w-64 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg sm:w-80 transition ease-out duration-100 opacity-0 scale-90 opacity-100 scale-100" : "hidden transition ease-in duration-100 opacity-100 scale-100 opacity-0 scale-90"}`}
        >
          <div className="py-2">
            <Link
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform hover:bg-gray-100"
            >
              <Image
                width={256}
                height={256}
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600">
                <span className="font-bold">Lembrete de Consulta</span> Você tem
                uma consulta agendada para o dia 26 de Agosto de 2025 ás 15h15
              </p>
            </Link>
          </div>
          <Link
            href="#"
            className="block py-2 font-bold text-center text-white bg-gray-800 hover:underline"
          >
            Ver todas notificações
          </Link>
        </div>
      </div>
    </>
  );
}
