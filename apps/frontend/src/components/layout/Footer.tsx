import React from 'react';
import {
    FOOTER,
    CLINIC_INFO,
} from '@/data/Data';
import Logo from './nav/Logo';
import Image from 'next/image';
import Link from 'next/link';
import ButtonDefault from '../utils/ButtonDefault';

const year =
    new Date().getFullYear();

export function Footer() {
    return (
        <footer className='relative z-10 py-24 bg-neutral-800'>
            <div className='container px-0 md:px-6'>
                <div className='flex flex-wrap'>
                    <div className='flex w-full lg:w-1/4 lg:max-w-[25%] md:w-1/2 md:max-w-[50%] px-3 mb-9 relative'>
                        <div className=''>
                            <Logo
                                isBgDark={
                                    true
                                }
                                className='w-full h-auto mb-3'
                            />

                            <p className='text-justify text-zinc-100 mb-4 '>
                                {
                                    CLINIC_INFO.description
                                }
                            </p>
                            <ul className='mt-6 p-0 m-0 list-none'>
                                <li className='text-zinc-100 mb-3 inline-flex'>
                                    {FOOTER.socialMedia.map(
                                        (
                                            socialMedia
                                        ) => (
                                            <Link
                                                key={
                                                    socialMedia.id
                                                }
                                                href='#'
                                                className='inline-flex items-center justify-center text-white w-10 h-10  rounded-full text-center border border-white/25 bg-transparent transition-all duration-700 ease-in-out hover:bg-blue-600 mr-2.5'
                                                aria-label={
                                                    socialMedia.name
                                                }>
                                                <socialMedia.icon className='w-5 h-auto ' />
                                            </Link>
                                        )
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex w-full lg:w-1/4 lg:max-w-[25%] md:w-1/2 md:max-w-[50%] px-3 mb-9'>
                        <div className='footer-list w-full'>
                            <h5 className='text-xl font-semibold text-white mb-8'>
                                Informações
                                de Contato
                            </h5>
                            <div className='block'>
                                <ul className='p-0 m-0 list-none'>
                                    {FOOTER.contactInfo.map(
                                        (
                                            contactInfo,
                                            i
                                        ) => (
                                            <li
                                                key={i}
                                                className='text-zinc-100 mb-3 last:mb-0 w-full flex last:flex-wrap'>
                                                <contactInfo.icon className='text-base mr-1.5 flex' />

                                                {
                                                    contactInfo.text
                                                }
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full lg:w-1/4 lg:max-w-[25%] md:w-1/2 md:max-w-[50%] px-3 mb-9'>
                        <div className='footer-list w-full'>
                            <h5 className='text-xl font-semibold text-white mb-8'>
                                Horarios de
                                Funcionamento
                            </h5>
                            <ul className='p-0 m-0 list-none'>
                                {CLINIC_INFO.workingHours.map(
                                    (
                                        wh,
                                        i
                                    ) => (
                                        <li
                                            key={i}
                                            className='flex text-white pb-2.5 mb-0 items-center justify-between'>
                                            {wh.day}
                                            <span>
                                                {
                                                    wh.open
                                                }{' '}
                                                {wh.at}{' '}
                                                {
                                                    wh.close
                                                }
                                            </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='flex w-full lg:w-1/4 lg:max-w-[25%] md:w-1/2 md:max-w-[50%] px-3 mb-9'>
                        <div className='footer-list w-full'>
                            <h5 className='text-xl font-semibold text-white mb-8'>
                                Inscreva-se
                                na
                                Newsletter
                            </h5>
                            <div className='footer-info-newsletter'>
                                <form className='max-w-[580px] mx-auto mt-8'>
                                    <input
                                        type='email'
                                        className='flex flex-1 text-slate-900 w-full h-14 font-medium rounded outline-0 border-none mb-5 bg-white p-3'
                                        placeholder='Digite Seu Email'
                                        name='EMAIL'
                                    />
                                    <ButtonDefault
                                        href='#'
                                        text='Increva-se'
                                        className='rounded w-full'
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
