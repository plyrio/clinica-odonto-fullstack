import React from 'react';
import ProfessionalsCard from '@/components/cards/ProfessionalsCard';
import Section from '@/components/layout/Section';
import TitlesSection from '../utils/TitlesSection';

export default function Professionals() {
  return (
    <Section>
      <TitlesSection title='Nossos Médicos' subtitle='Dentistas Especialistas' />
      <ProfessionalsCard />
    </Section>
    )
  }