import Image from "next/image";
import {ResponseServiceDto} from "@odonto/core";
import { CardContainer } from "../layout/CardContainer";

async function fetchServices(): Promise<ResponseServiceDto[]> {
  const res = await fetch("https://cof-backend.onrender.com/services");
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
}

export default async function ServicesCard() {
  const services = await fetchServices();

  return (
    <CardContainer>
        {services.map((service) => (
                <div>
            <Image
                  width={64}
                  height={64}
                  className='h-8 w-8'
                  src={
                    service.imgUrl ||
                    "https://res.cloudinary.com/dn5yfai0g/image/upload/v1736903941/tooth_ptns1e.png"
                  }
                  alt={`avatar de ${service.name}`}
                />

            <h1 className="mt-4 text-xl font-semibold text-gray-800 ">{service.name}</h1>

            <p className="mt-2 text-gray-500">{service.description}</p>
          </div>
        ))}
    </CardContainer>
  );
}
