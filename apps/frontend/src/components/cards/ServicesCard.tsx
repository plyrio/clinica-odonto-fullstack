import React from "react";
import Card from "../layout/GridContainer";
import CardBase from "./CardBase";

export default async function ServicesCard() {
  const data = await fetch("https://cof-backend.onrender.com/services");
  const services = await data.json();

  return (
    <>
      <Card gridClassName='w-xl'>
        {services.map((serv) => (
          <CardBase
            key={serv.id}
            imageSrc={serv.imgUrl}
            title={serv.name}
            description={serv.description}
            cardClass='max-w-sm min-h-96'
            buttonText='Saiba Mais'
            linkHref='#'
            imageClassName='justify-center w-16 h-16'
          />
        ))}
      </Card>
    </>
  );
}
