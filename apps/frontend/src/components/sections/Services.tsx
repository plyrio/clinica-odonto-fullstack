import React from "react";
import ServicesCard from "@/components/cards/ServicesCard";
import Section from "../layout/Section";
import TitlesSection from "../utils/TitlesSection";

export default function ServicesSection() {

  return (
    <Section className='bg-neutral-200'>
      <TitlesSection
        title='Serviços Odontológico'
        subtitle='O Que Oferecemos'
      />
      <ServicesCard />
    </Section>
  );
}
