import React from 'react';
import { PROFESSIONALS_INFO } from '@/data/professionalsData';
import Image from 'next/image';
import Card from '../layout/GridContainer';

export default function ProfessionalsCard() {
  return (
          <Card >
        {PROFESSIONALS_INFO.map((prof) =>
          <div key={prof.id} className="w-full max-w-xs text-center">
            <Image width={64} height={64} className="object-cover object-center w-full h-96 mx-auto rounded-lg" src={prof.imgUrl} alt={`avatar de ${prof.name}`} />

            <div className="mt-2">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{prof.name}</h3>
              <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">{prof.function}</span>
            </div>
          </div>
        )}
      </Card>
  )
}