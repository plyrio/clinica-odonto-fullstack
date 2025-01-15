import Image from "next/image";
import { ResponseServiceDto } from "@odonto/core";

async function fetchServices(): Promise<ResponseServiceDto[]> {
  const res = await fetch("https://cof-backend.onrender.com/services", {
    cache: "no-cache"
  });
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
 
}

export default async function ServicesCard() {
  const services = await fetchServices();

  return (
      <div className="grid gap-14 md:grid-cols-3 sm:grid-cols-2 md:gap-5 py-12">
        {services.map((service) => (
        <div key={service.id} className="rounded-xl bg-white p-6 text-center drop-shadow-md  md:my-5">
          <div
            className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-md shadow-brand-fgsecondary/50">
              <Image 
              width={640}
                height={640}
                className="h-10 w-10"
                src= { service.imgUrl || "https://res.cloudinary.com/dn5yfai0g/image/upload/v1736903941/tooth_ptns1e.png"}
                alt={`avatar de ${service.name}`} />
          </div>
          <h1 className="mb-3 text-xl font-medium lg:px-14">{service.name}</h1>
          <p className="px-4">{service.description}</p>
        </div>
        ))}
      </div>
  );
}
