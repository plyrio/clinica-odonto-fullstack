import Image from "next/image";
import {ResponseServiceDto} from "@odonto/core";

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
    <div className='flex flex-wrap justify-center mt-10 bg-amber-100'>
      {services.map((serv) => (
        <div key={serv.id} className='p-4 max-w-xl'>
          <div className='flex rounded-lg h-full p-8 flex-col bg-brand-bgwhite'>
            <div className='flex items-center mb-3'>
              <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  flex-shrink-0'>
                <Image
                  src={serv.imgUrl || ``}
                  width='28'
                  height='28'
                  alt={serv.name || ``}
                  className='w-7 h-7 text-gray-500 mb-3'
                />
              </div>
              <h2 className='text-lg font-medium'>{serv.name}</h2>
            </div>
            <div className='flex flex-col justify-between flex-grow'>
              <a
                href='#'
                className='mt-3 hover:text-blue-600 inline-flex items-center'>
                Saiba Mais
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='w-4 h-4 ml-2'
                  viewBox='0 0 24 24'>
                  <path d='M5 12h14M12 5l7 7-7 7'></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
