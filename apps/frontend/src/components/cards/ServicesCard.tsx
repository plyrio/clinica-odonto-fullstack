import Card from "../layout/GridContainer";
import CardBase from "./CardBase";
import {ResponseServiceDto} from "@odonto/core"

async function fetchServices(): Promise<ResponseServiceDto[]> {
  const res = await fetch("https://cof-backend.onrender.com/services", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
}


export default async function ServicesCard() {
  
  const services = await fetchServices();

  return (
    <>
      <Card gridClassName='w-xl'>
        {services.map((serv) => (
          <CardBase
            key={serv.id}
            imageSrc={serv.imgUrl || ` `}
            title={serv.name || ``}
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
