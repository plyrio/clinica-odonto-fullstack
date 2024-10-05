import React from 'react';
import { SERVICES } from '@/data/Data';
import Card from '../layout/GridContainer';
import CardBase from './CardBase';

export default function ServicesCard() {
  return (
    <>
      <Card gridClassName='w-xl' >
        {SERVICES.map((serv) => (
          <CardBase
            key={serv.id}
            imageSrc={serv.imgUrl}
            title={serv.name}
            description={serv.description}
            cardClass='max-w-sm min-h-96'
            buttonText="Saiba Mais"
            linkHref="#"


            imageClassName='justify-center w-16 h-16'

          />
        ))}
      </Card>
    </>
  )
}