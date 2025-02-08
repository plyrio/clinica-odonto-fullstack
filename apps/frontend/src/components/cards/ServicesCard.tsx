import Image from "next/image";
import { ResponseServiceDto } from "@odonto/core";
import { CardContainer } from "../layout/CardContainer";
import ButtonDefault from "../utils/ButtonDefault";

async function fetchServices(): Promise<ResponseServiceDto[]> {
  try {
    const res = await fetch("https://cof-backend.onrender.com/services" );
    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesCard() {
  let services: ResponseServiceDto[] = [];
  try {
    services = await fetchServices();
  } catch (error) {
    console.error("Error in ServicesCard component:", error);
  }

  return (
    <CardContainer>
      {services.length > 0 ? (
        services.map((service) => (
          <div key={service.id} className="flex">
              <div className="h-full relative z-10 block p-[35px] px-[30px] text-left  
                      rounded-[5px] bg-white mt-[30px] overflow-hidden  
                      shadow-lg transition-all duration-500 ease-out before:text-left">
                  <div className="relative z-10 text-blue-600 w-[55px] h-[55px] mb-[25px] transition-all duration-500">
                      <Image width={45} height={45} src={
                          service.imgUrl ||
                          "https://res.cloudinary.com/dn5yfai0g/image/upload/v1736903941/tooth_ptns1e.png"
                      }
                          alt={`avatar de ${service.name}`} className="text-[45px] ml-[20px]" />
                      <span className="absolute -z-10 left-0 top-1/4 w-[45px] h-[45px]  
                           bg-neutral-100 rounded-full transform -translate-y-1/2">
                      </span>
                  </div>
                  <h3 className="font-bold mb-0 transition-all duration-400 ease-out leading-[1.4]">{service.name}</h3>
                  <p className="flex flex-growtext-[15px] mt-[15px] mb-0 transition-all duration-400 ease-out will-change-transform">{service.description}</p>
                  <div className="mt-[25px]">
                      <ButtonDefault text="Leia Mais" href={`/service/${service.id}`} />
                  </div>
              </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No services available.</p>
      )}
    </CardContainer>
  );
}
