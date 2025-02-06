import React from "react";
import Hero from "@/components/sections/Hero";
import ProfessionalsCard from "@/components/cards/ProfessionalsCard";
import Section from "@/components/layout/Section";

export default function Professionals() {
  return (
    <>
      <Hero title='Profissionais' />
      <Section>
        <ProfessionalsCard />
      </Section>
    </>
  );
}
