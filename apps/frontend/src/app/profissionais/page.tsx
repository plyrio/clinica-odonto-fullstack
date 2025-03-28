import React from "react";
import Hero from "@/components/sections/Hero";
import ProfessionalsCard from "@/components/ui/professional/ProfessionalsCard";
import Section from "@/components/ui/layout/Section";

export default function Professionals() {
  return (
    <>
      <Hero title="Profissionais" />
      <Section>
        <ProfessionalsCard />
      </Section>
    </>
  );
}
