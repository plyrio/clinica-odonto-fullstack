import Image from "next/image";
import { ResponseServiceDto } from "@odonto/core";
import { CardContainer } from "../layout/CardContainer";
import ButtonDefault from "../utils/ButtonDefault";

async function fetchServices(): Promise<ResponseServiceDto[]> {
  try {
    const res = await fetch("https://cof-backend.onrender.com/services", {
      next: { revalidate: 600 },
      cache: "force-cache",
    });
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
    <CardContainer >
      {services.length > 0 ? (
        services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col h-full bg-white rounded-xl shadow-card relative z-10 p-[35px] px-[30px] text-left  
             mt-[30px] overflow-hidden  
             transition-all duration-500 ease-out 
             before:text-left before:content-[''] before:absolute before:left-0 before:bottom-0 
             before:w-0 before:h-[3px] before:bg-blue-600 
             before:transition-all before:duration-1000 hover:before:w-full"
          >


            <div className="relative w-[55px] h-[55px] mb-4 ">
              <Image
                width={45}
                height={45}
                src={
                  service.imgUrl ||
                  "https://res.cloudinary.com/dn5yfai0g/image/upload/v1736903941/tooth_ptns1e.png"
                }
                alt={`avatar de ${service.name}`}
                className="text-[45px] ml-[20px] rounded-full"
              />
              <span className="absolute -z-10 left-0 top-1/4 w-[45px] h-[45px] bg-neutral-100 rounded-full transform -translate-y-1/2"></span>
            </div>

            <h3 className="font-bold mb-0 transition-all duration-400 ease-out leading-[1.4]">{service.name}</h3>
            <p className="flex flex-grow text-[15px] mt-[15px] mb-0 transition-all duration-400 ease-out will-change-transform">{service.description}</p>

            <div className="mt-auto pt-4">
              <ButtonDefault text="Leia Mais" href={`/service/${service.id}`} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No services available.</p>
      )}
    </CardContainer>
  );
}
