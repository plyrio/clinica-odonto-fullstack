import { FC } from 'react';
import { IconBrandFacebookFilled, IconBrandInstagramFilled, IconBrandLinkedinFilled, IconBrandYoutubeFilled, IconHomeFilled, IconMailFilled, IconPhoneFilled } from '@tabler/icons-react';

export const LOGO = '/Rayssa.png';
export const CLAREAMENTO = '/src/assets/images/services/clean-tooth (1).png';
export const IMPLANTE = '/src/assets/images/services/dental-implant.png';
export const PROTESE = '/src/assets/images/services/prothesis.png';
export const ORTODONTIA = '/src/assets/images/services/braces.png';
export const LIMPEZA = '/src/assets/images/services/clean-tooth.png';


export interface OperatingHours {
    day: string;
    open: string;
    close: string | null;
    at: string | null;
}

export interface SocialMedia {
    id: number;
    name: string;
    url: string;
    icon: FC<{ className?: string; fill?: string; viewBox?: string; }>;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
}

export interface Professional {
    id: number;
    name: string;
    specialty: string;
    bio: string;
}

export interface Partner {
    id: number;
    name: string;
    website: string;
    logo: string;
}

export interface FooterLink {
    label: string;
    url: string;
}



export interface ContactInfo {
    icon: FC<{ className?: string; fill?: string; viewBox?: string; }>;
    text: string;
}

export interface Footer {
    links: FooterLink[];
    contactInfo: ContactInfo[];
    socialMedia: SocialMedia[];
}

export interface ClinicInfo {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    socialMedia: SocialMedia[];
    workingHours: OperatingHours[];
}

export interface About {
    title: string;
    description: string;
}


export const CLINIC_INFO: ClinicInfo = {
    name: "Rayssa Odonto",
    description: "Acreditamos que um sorriso saudável é a chave para uma vida mais feliz e confiante Nossa missão é transformar vidas através de cuidados odontológicos personalizados, sempre priorizando o bem-estar e a satisfação de nossos pacientes.",
    address: "Rua dos Sorrisos, 123, Centro, São Paulo, SP",
    phone: "(11) 98765-4321",
    email: "contato@odontosorriso.com.br",
    socialMedia: [
        {
            id: 1,
            name: "Facebook",
            url: "https://www.facebook.com/odontosorriso",
            icon: IconBrandFacebookFilled,
        },
        {
            id: 2,
            name: "Instagram",
            url: "https://www.instagram.com/odontosorriso",
            icon: IconBrandInstagramFilled,
        },
        {
            id: 3,
            name: "LinkedIn",
            url: "https://www.linkedin.com/company/odontosorriso",
            icon: IconBrandLinkedinFilled,
        },
        {
            id: 4,
            name: "YouTube",
            url: "https://www.youtube.com/channel/odontosorriso",
            icon: IconBrandYoutubeFilled,
        }
    ],
    workingHours: [
        { day: "Segunda-feira", open: "08:00", at: "às", close: "17:00" },
        { day: "Terça-feira", open: "08:00", at: "às", close: "17:00" },
        { day: "Quarta-feira", open: "08:00", at: "às", close: "17:00" },
        { day: "Quinta-feira", open: "08:00", at: "às", close: "17:00" },
        { day: "Sexta-feira", open: "08:00", at: "às", close: "17:00" },
        { day: "Sábado", open: "08:00", at: "às", close: "12:00" },
        { day: "Domingo", open: "Fechado", at: null, close: null },
    ],
};

export const ABOUT: About = {
    title: "Sobre Nós",
    description:
        "A Clínica OdontoSorriso é referência em cuidados odontológicos, oferecendo um atendimento humanizado e tratamentos modernos para garantir a saúde e o bem-estar de seus pacientes. Com uma equipe de profissionais altamente qualificados e infraestrutura de ponta, buscamos proporcionar uma experiência acolhedora e resultados excepcionais.",
};

export const SERVICES: Service[] = [
    {
        id: 1,
        name: "Clareamento Dental",
        description:
            "Devolva o brilho ao seu sorriso com nosso tratamento de clareamento dental, seguro e eficaz.",
        imgUrl: "/src/assets/images/services/clean-tooth (1).png",
    },
    {
        id: 2,
        name: "Implantes Dentários",
        description:
            "Recupere sua autoestima com nossos implantes dentários de última geração, que garantem conforto e durabilidade.",
        imgUrl: "/src/assets/images/services/dental-implant.png",
    },
    {
        id: 3,
        name: "Ortodontia",
        description:
            "Corrija a posição dos seus dentes e tenha um sorriso alinhado e saudável com nossos tratamentos ortodônticos.",
        imgUrl: "/src/assets/images/services/braces.png",
    },
    {
        id: 4,
        name: "Próteses Dentárias",
        description:
            "Oferecemos próteses dentárias de alta qualidade, personalizadas para atender às suas necessidades.",
        imgUrl: "/src/assets/images/services/prothesis.png",
    },
    {
        id: 5,
        name: "Limpeza e Profilaxia",
        description:
            "Mantenha sua saúde bucal em dia com nossas limpezas profissionais e orientações de higiene.",
        imgUrl: "/src/assets/images/services/clean-tooth.png",
    },
];

export const PROFESSIONALS: Professional[] = [
    {
        id: 1,
        name: "Dr. João Silva",
        specialty: "Implantodontista",
        bio: "Dr. João Silva é especialista em implantodontia, com mais de 15 anos de experiência na reabilitação oral de pacientes.",
    },
    {
        id: 2,
        name: "Dra. Maria Oliveira",
        specialty: "Ortodontista",
        bio: "Dra. Maria Oliveira é ortodontista com vasta experiência em tratamentos para alinhamento dentário e correção de mordida.",
    },
    {
        id: 3,
        name: "Dr. Carlos Pereira",
        specialty: "Protesista",
        bio: "Especialista em próteses dentárias, Dr. Carlos Pereira é reconhecido pela qualidade e precisão de seus trabalhos.",
    },
    {
        id: 4,
        name: "Dra. Ana Mendes",
        specialty: "Dentista Geral",
        bio: "Dra. Ana Mendes é dentista geral com foco em cuidados preventivos e tratamentos de rotina para todas as idades.",
    },
];

export const PARTNERS: Partner[] = [
    {
        id: 1,
        name: "Colgate",
        website: "https://www.colgate.com",
        logo: "/images/partners/colgate.png",
    },
    {
        id: 2,
        name: "Oral-B",
        website: "https://www.oralb.com",
        logo: "/images/partners/oralb.png",
    },
    {
        id: 3,
        name: "Straumann",
        website: "https://www.straumann.com",
        logo: "/images/partners/straumann.png",
    },
    {
        id: 4,
        name: "Neodent",
        website: "https://www.neodent.com.br",
        logo: "/images/partners/neodent.png",
    },
];

export const FOOTER: Footer = {
    links: [
        { label: "Home", url: "#home" },
        { label: "Sobre Nós", url: "#about" },
        { label: "Serviços", url: "#services" },
        { label: "Profissionais", url: "#professionals" },
        { label: "Parceiros", url: "#partners" },
        { label: "Contato", url: "#contact" },
    ],
    contactInfo: [
        {
            icon: IconHomeFilled,
            text: "Rua dos Sorrisos, 310, Vila Vleha - ES",
        },
        {
            icon: IconPhoneFilled,
            text: "(27) 9 8869-3416",
        },
        {
            icon: IconMailFilled,
            text: "ClinicaOdonto@clinica.com.br"
        },
    ],
    socialMedia: [
        {
            id: 1,
            name: "Facebook",
            url: "https://www.facebook.com/odontosorriso",
            icon: IconBrandFacebookFilled,
        },
        {
            id: 2,
            name: "Instagram",
            url: "https://www.instagram.com/odontosorriso",
            icon: IconBrandInstagramFilled,
        },
        {
            id: 3,
            name: "LinkedIn",
            url: "https://www.linkedin.com/company/odontosorriso",
            icon: IconBrandLinkedinFilled,
        },
        {
            id: 4,
            name: "YouTube",
            url: "https://www.youtube.com/channel/odontosorriso",
            icon: IconBrandYoutubeFilled,
        }
    ],
}