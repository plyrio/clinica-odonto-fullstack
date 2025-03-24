'use client';
import React from 'react';
import { User } from 'next-auth';
import { useDropdown } from '@/hooks/useDropdown';
import Link from 'next/link';
import SignOut from '../button/ButtonSignOut';
import Image from 'next/image';
import NotifyBell from './NotifyBell';

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
  menuOpen,
  menuRef,
  toggleMenu,
  } = useDropdown("userMenu");

  return (
  <div className="flex justify-center items-center gap-4">
<NotifyBell user={user} />
   <div
    ref={menuRef}
    className="relative md:flex">
    <button
      onClick={
      toggleMenu
      }
      type="button"
      aria-expanded="true"
      className="overflow-hidden rounded-full border-2 border-gray-300 shadow-inner flex items-center justify-center focus:ring focus:ring-gray-300">
     <span className="sr-only">
      Toggle
      dashboard menu
     </span>
     <Image
        alt={
        user.name ||
        ''
        }
        src={
        user.image ||
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        height={128}
        width={128}
        className="h-10 w-10 object-cover"
        />
    </button>
    <div
      className={`${
      menuOpen
      ? 'absolute top-12 end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg list-none': 'hidden'
      } `}
      role="menu">
          <div
        className="px-4 py-3">
     <span
          className="block text-sm text-gray-900"
          >{user.name}</span
        >
     <span
          className="block text-sm  text-gray-500 truncate"
          >{user.email}</span
        >
      </div>
     <ul className="p-2">
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
      </ul>

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