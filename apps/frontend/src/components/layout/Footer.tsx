import React from "react";
import { FOOTER, CLINIC_INFO, LOGO, SERVICES } from "@/data/Data";
import Image from "next/image";
import Link from "next/link";

const year = new Date().getFullYear();

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="xl:container p-4 mx-auto">
                <div className="lg:flex">
                    <div className="w-full lg:w-2/5">
                        <div className="px-6">
                            <Link href="#" className="flex" >
                                <Image src={LOGO} height={32} width={32} alt="Flowbite Logo" className="w-auto h-7" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap ms-5">{CLINIC_INFO.name}</span>
                            </Link>

                            <p className="max-w-sm mt-2 text-gray-500">{CLINIC_INFO.description}</p>

                            <div className="flex mt-6 -mx-2">

                                {FOOTER.socialMedia.map((socialMedia) =>
                                    <Link key={socialMedia.id} href="#"
                                        className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                                        aria-label={socialMedia.name}>
                                        <socialMedia.icon className="w-8 h-8 fill-current" viewBox="0 0 24 24" fill="none" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:flex-1">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            <div className="w-full">
                                <h3 className="text-gray-700 uppercase ">Horário de Funcionamento</h3>
                                <ul className="list-none">
                                    {CLINIC_INFO.workingHours.map((wh) =>

                                        <li className="flex mt-2 text-sm text-gray-600 hover:underline gap-4" key={wh.day}>
                                            <span className="w-2/4 font-medium text-left ">{wh.day}</span>
                                            <span className="text-center">{wh.open}</span>
                                            <span className="text-center">{wh.at}</span>
                                            <span className="text-center">{wh.close}</span>
                                        </li>
                                    )}
                                </ul>

                            </div>
                            <div className="w-full">
                                <h3 className="text-gray-700 uppercase">Serviços</h3>

                                {SERVICES.map((service) =>
                                    <a key={service.id} href="#" className="block mt-2 text-sm text-gray-600 hover:underline">{service.name}</a>
                                )}
                            </div>
                            <div className="w-full">
                                <h3 className="text-gray-700 uppercase">Contatos</h3>

                                {Object.entries(FOOTER.contactInfo).map(([key, { icon: Icon, text }]) =>
                                    <div key={key} className="flex text-sm text-gray-600 mt-2">
                                        <Icon className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24" />
                                        <span className="text-sm text-gray-600 hover:underline">
                                            {text}
                                        </span>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                <hr className="h-px my-6 bg-gray-200 border-none" />

                <div>
                    <p className="text-center text-gray-500">© Brand {year} - All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}