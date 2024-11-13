'use client';
import React, { useState } from 'react';
import { LOGO, CLINIC_INFO} from '@/data/Data';
import { ProfileBtn } from '@/components/utils/ProfileBtn';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow((cur) => !cur)

  return (
    <nav className="sticky bg-white w-full top-0 start-0  mx-auto z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
        <Link href="#" className="flex items-center space-x-3">
          <Image src={LOGO} height={32} width={32} alt="Clinica Logo Alt" />
          <span className="self-center text-base md:font-semibold  whitespace-nowrap">{CLINIC_INFO.name}</span>
        </Link>

      
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <ProfileBtn />    
          <button
            onClick={handleOpen}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={show}
          >
            <span className="sr-only">Abrir menu principal</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d='M1 1h15M1 7h15M1 13h15'/>
            </svg>
          </button>
        </div>

      
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${show ? 'block' : 'hidden'}`} 
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8  md:flex-row md:mt-0 md:border-0">
            <li>
              <Link href="/" className={`block py-2 px-3   rounded md:bg-transparent ${pathname === '/' ? ' md:text-brand-primary' : ' text-gray-900'} md:p-0`} aria-current={pathname === '/' ? 'page' : undefined}>Início</Link>
            </li>
            <li>
              <Link href="/sobre" className={`block py-2 px-3   rounded md:bg-transparent ${pathname === '/sobre' ? ' md:text-brand-primary' : ' text-gray-900'} md:p-0`} aria-current={pathname === '/sobre' ? 'page' : undefined}>Sobre</Link>
            </li>
            <li>
              <Link href="/servicos" className={`block py-2 px-3   rounded md:bg-transparent ${pathname === '/servicos' ? ' md:text-brand-primary' : ' text-gray-900'} md:p-0`} aria-current={pathname === '/servicos' ? 'page' : undefined}>Serviços</Link>
            </li>
            <li>
              <Link href="/profissionais" className={`block py-2 px-3   rounded md:bg-transparent ${pathname === '/profissionais' ? ' md:text-brand-primary' : ' text-gray-900'} md:p-0`} aria-current={pathname === '/profissionais' ? 'page' : undefined}>Profissionais</Link>
            </li>
            <li>
              <Link href="/blog" className={`block py-2 px-3   rounded md:bg-transparent ${pathname === '/blog' ? ' md:text-brand-primary' : ' text-gray-900'} md:p-0`} aria-current={pathname === '/blog' ? 'page' : undefined}>Blog</Link>
            </li>
            <li>
              <Link href="/contatos" className={`block py-2 px-3   rounded md:bg-transparent ${pathname === '/contatos' ? ' md:text-brand-primary' : ' text-gray-900'} md:p-0`} aria-current={pathname === '/contatos' ? 'page' : undefined}>Contatos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
