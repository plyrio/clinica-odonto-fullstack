import React from "react";
import Section from "../layout/Section";
import TitlesSection from "../utils/TitlesSection";
import TestimonialsCard from "../cards/TestimonialsCard";

export default function Testimonials() {
  return (
    <Section>
      <TitlesSection title='Nosso Feedback' subtitle='Nossos Pacientes Dizem' />
      <TestimonialsCard />
    </Section>
  );
}
