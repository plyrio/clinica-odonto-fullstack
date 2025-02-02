import React from 'react';

type TitlesSectionProps = {
  title: string;
  subtitle?: string;
}

export default function TitlesSection({ title, subtitle }: TitlesSectionProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-gray-800 text-3xl font-extrabold">{title}</h2>
      <div className="flex justify-center mx-auto mt-6">
        <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
        <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
        <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
      </div>
      <p className="text-gray-800 text-sm leading-relaxed max-w-2xl mx-auto mt-6 text-center">{subtitle}</p>
    </div>

  )
}

