import React from 'react';

type TitlesSectionProps = {
    title: string;
    subtitle?: string;
}

export default function TitlesSection({title, subtitle}: TitlesSectionProps) {
  return (
                <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-gray-800 text-3xl font-extrabold">{title}</h2>
              <p className="text-gray-800 text-sm mt-4 leading-relaxed">{subtitle}</p>
          </div>
      
  )
}

