import React from 'react';

type SectionLayoutProps = {
  children: React.ReactNode; // Aceita qualquer conteúdo dentro da seção
  className?: string; // Permite adicionar classes extras, se necessário
};

export default function Section({ children, className = '' }: SectionLayoutProps) {
  return (
    <section className={`py-8 ${className}`}>
      <div className="max-w-screen-xl mx-auto">
        {children}
      </div>
    </section>
  );
}
