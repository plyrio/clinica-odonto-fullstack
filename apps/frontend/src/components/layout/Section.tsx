import React from 'react';

type SectionLayoutProps = {
  children: React.ReactNode;
  className?: string;
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
