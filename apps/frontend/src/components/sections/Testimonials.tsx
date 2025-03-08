import React from "react";
import Section from "../layout/Section";
import TitlesSection from "../utils/TitlesSection";
import TestimonialsCard from "../cards/TestimonialsCard";

export default function Testimonials() {
  return (
    <Section className="bg-zinc-300/20" noContainer={true}>
      <TitlesSection title='Nosso Feedback' subtitle='Nossos Pacientes Dizem' />
      <TestimonialsCard />
    </Section>
  );
}
