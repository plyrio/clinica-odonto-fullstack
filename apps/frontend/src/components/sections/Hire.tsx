import React from "react";
import Section from "../ui/layout/Section";
import ButtonDefault from "../ui/button/Button";

export default function Hire() {
  return (
    <Section
      noContainer={true}
      className="relative bg-banner w-full contain-none bg-cover bg-center bg-no-repeat text-white text-center"
    >
      <div className="absolute inset-0 h-full w-full opacity-60 bg-slate-900"></div>
      <div className="relative container justify-center mx-auto">
        <h2 className="text-white text-[32px] md:text-[38px] font-bold md:mb-4 ">
          Faça Um Check-up Com o Dentista
        </h2>
        <h5 className="text-white text-[20px] font-semibold">
          Agende uma consulta, ligue hoje: +55 5 5555 5555
        </h5>
        <ButtonDefault href="/" text="Marcar Consulta" className="mt-5" />
      </div>
    </Section>
  );
}
