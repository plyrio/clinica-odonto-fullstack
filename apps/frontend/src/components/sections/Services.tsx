import { Suspense } from "react";
import ServicesCard from "@/components/cards/ServicesCard";
import Section from "../layout/Section";
import TitlesSection from "../utils/TitlesSection";

export default function ServicesSection() {
  return (
    <Section className="bg-neutral-200">
      <TitlesSection title="Serviços Odontológicos" subtitle="O Que Oferecemos" />
      <Suspense fallback={<div>Carregando...</div>}>
        <ServicesCard />
      </Suspense>
    </Section>
  );
}