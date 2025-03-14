'use client';
import React from 'react';
import Link from 'next/link';
import {CLINIC_INFO} from '@/data/Data';
import {usePathname} from 'next/navigation';

const navLinks = [
 {
  name: 'Serviços',
  href: '/servicos',
 },
 {
  name: 'Sobre',
  href: '/sobre',
 },
 {
  name: 'Blog',
  href: '/blog',
 },
 {
  name: 'Contato',
  href: '/contatos',
 },
];

export default function NavLinks() {
 const pathname =
  usePathname();
 return (
  <nav
   aria-label='Global'
   className='hidden md:flex h-full items-center justify-center hover:border-b-blue-600 w-full'>
   <ul className='flex justify-evenly items-center text-sm h-full'>
    {navLinks.map(
     (link, i) => (
      <li
       key={i}
       className='flex h-full w-full'>
       <Link
        className={`flex h-full font-medium items-center w-full 
                transition-shadow duration-300 cursor-pointer relative before:content-[''] before:absolute before:left-0 before:bottom-0 
             before:w-0 before:h-[3px] before:bg-blue-600 px-3
             before:transition-all before:duration-300 hover:before:w-full
                 ${
                  pathname ===
                  link.href
                   ? ' md:text-brand-primary'
                   : ' text-gray-700'
                 }`}
        href={
         link.href
        }>
        {' '}
        {link.name}
       </Link>
      </li>
     )
    )}
   </ul>
  </nav>
 );
}
