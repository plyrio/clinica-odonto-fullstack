'use client';
import React from 'react';
import { User } from 'next-auth';
import { useUserMenu } from '@/hooks/useUserMenu';
import Link from 'next/link';
import SignOut from '../button/ButtonSignOut';
import { IconBell } from "@tabler/icons-react";
import Image from 'next/image';


type Props = {
 user: User;
};

const userLinks = [
 {
  name:
   'Meu Perfil',
  href: '#',
 },
 {
  name:
   'Meus Agendamentos',
  href: '#',
 },
 {
  name:
   'Histórico de Consultas',
  href: '#',
 },
 {
  name:
   'Configurações da Conta',
  href: '#',
 },
];

export default function UserMenu({
 user,
}: Props) {

 const {
  menuOpenUser,
   menuRef, toggleMenuUser,
 } = useUserMenu();

 return (
  <div className="flex items-center gap-4">
     <Link href={"#"}>
       <div className="flex items-center relative">
         <IconBell stroke={2} className='text-gray-700' />
         <div className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center text-xs text-white">4</div>
       </div>
     </Link>
   <div
    ref={menuRef}
    className="relative md:flex">
    <button
       onClick={
        toggleMenuUser
       }
       type="button"
       aria-expanded="true"
       className="overflow-hidden rounded-full border-2 border-gray-300 shadow-inner flex items-center justify-center">
       <span className="sr-only">
        Toggle dashboard
        menu
       </span>
       <Image
        alt={
         user.name || ''
        }
        src={
         user.image ||
         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        height={256}
        width={256}
        className=" size-10 object-cover"
       />
      </button>
    <div
     className={`${
      menuOpenUser
       ? 'absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg'
       : 'hidden'
     } `}
     role="menu">
     <div className="p-2">
      {userLinks.map(
       (
        link,
        index,
       ) => (
        <Link
         key={index}
         href={
          link.href
         }
         className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
         {link.name}
        </Link>
       ),
      )}
     </div>

     <div className="p-2">
      <SignOut
       text="Sair"
       icon
       className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
      />
     </div>
    </div>
   </div>
  </div>
 );
}
