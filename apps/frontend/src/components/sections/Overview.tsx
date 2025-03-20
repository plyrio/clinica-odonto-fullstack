import Section from "@/components/ui/layout/Section";
import TitlesSection from "../ui/layout/TitlesSection";
import Image from "next/image";
import { IconChecks } from "@tabler/icons-react";

const list = [
    {
        title: "Tecnologia Avançada"
    },
    {
        title: "Dentistas Experientes"
    },
    {
        title: "Ambiente Confortável"
    },
    {
        title: "Preços Acessíveis"
    },
    {
        title: "Equipe Amigável"
    },
    {
        title: "Localização Conveniente"
    }
];

export default function Overview() {
    return (
        <Section>
            <div className="flex flex-wrap items-center  ">
                <div className="flex flex-col w-full lg:w-1/2">
                    <TitlesSection
                        title={
                            <>
                                Por que escolher a{" "}
                                <span className="text-blue-600">
                                    Clinica Odonto
                                </span>{" "}
                                para extração dentária?
                            </>
                        }
                        subtitle="Por que Nos Escolher"
                        subtitleClassName="text-start"
                        titleClassName="text-start"
                        baseClassName="justify-start"
                    />
                    <div className="">
                        <p>
                            Na Clinica Odonto, entendemos que a extração
                            dentária pode ser uma experiência preocupante. Por
                            isso, oferecemos um atendimento humanizado, com
                            profissionais altamente qualificados e tecnologia de
                            ponta para garantir um procedimento seguro,
                            eficiente e o mais confortável possível.
                        </p>
                    </div>
                    <ul className="flex flex-wrap p-0 list-none mb-0 mt-2.5 mx-[-10px]">
                        {list.map((item, i) => (
                            <li
                                key={i}
                                className="flex w-full md:w-1/2 mt-5 px-2.5"
                            >
                                <span className="relative z-10 flex flex-1 text-zinc-600 text-base font-medium py-4 px-2.5 pe-3 rounded-md border-l-4 border-blue-600 bg-neutral-100 overflow-hidden transition duration-400 items-center ">
                                    <IconChecks
                                        stroke={2}
                                        className="text-blue-600 text-xl me-2.5 transition duration-400"
                                    />
                                    {item.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-center w-full h-full lg:w-1/2 lg:px-4 pt-0 px-0">
                    <div className="flex mt-9 h-full w-full">
                        <Image
                            src="https://res.cloudinary.com/dn5yfai0g/image/upload/v1741543504/overview_rlh828.jpg"
                            alt="Overview"
                            width={900}
                            height={470}
                            className="flex rounded h-full w-full flex-grow"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
