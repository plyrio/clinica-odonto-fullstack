import React from 'react';

type TitlesSectionProps = {
    title: string;
    subtitle?: string;
}

export default function TitlesSection({title, subtitle}: TitlesSectionProps) {
  return (
      <div className="text-center">
          <h6 className='text-xl py-3 text-brand-primary'>{subtitle}</h6>

          <h2 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
              {title}
          </h2>
      </div>
  )
}

