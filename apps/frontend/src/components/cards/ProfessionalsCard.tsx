import Image from "next/image";
import {ResponseEmployeeDto} from "@odonto/core";
import {CardContainer} from "../layout/CardContainer";
import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandFacebookFilled,
  IconBrandLinkedinFilled,
  IconBrandTwitterFilled
} from "@tabler/icons-react";

async function fetchProfessionals(): Promise<ResponseEmployeeDto[]> {
  try {
    const res = await fetch("https://cof-backend.onrender.com/employee", {
      next: {revalidate: 600},
      cache: "force-cache"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch professionals");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return [];
  }
}

export default async function ProfessionalsCard() {
  let professionals: ResponseEmployeeDto[] = [];
  try {
    professionals = await fetchProfessionals();
  } catch (error) {
    console.error("Error in ProfessionalsCard component:", error);
  }

  const doctors = professionals.filter((prof) => prof.role?.includes("DOCTOR"));

  return (
    <CardContainer>
      {doctors.length > 0 ? (
        doctors.map((professional) => (
          <div
            key={professional.id}
            className='flex flex-col h-full bg-white rounded-xl mt-[30px] overflow-hidden'>
            <div className='relative flex w-full group z-10 rounded-[5px] overflow-hidden mx-auto flex-1'>
              <Image
                src={
                  professional.imgUrl || "https://readymadeui.com/team-1.webp"
                }
                width={400}
                height={200}
                className='w-full flex-1 object-cover h-auto'
                alt={`Imagem de ${professional.name}`}
              />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-50 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-50"></div>

              <div className='absolute inset-0 flex items-center justify-center space-x-4 opacity-0 transition-all duration-500 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 bottom-[-250px]'>
                <Link href={`#`}>
                  <IconBrandFacebookFilled className=' border bg-white rounded-md text-blue-500 h-[50px] w-[50px] md:h-[30px] md:w-[30px]' />
                </Link>
                <Link href={`#`}>
                  <IconBrandLinkedinFilled className='border bg-white rounded-md text-blue-500 h-[50px] w-[50px] md:h-[30px] md:w-[30px]' />
                </Link>
                <Link href={`#`}>
                  <IconBrandTwitterFilled className=' border bg-white rounded-md text-blue-500 h-[50px] w-[50px] md:h-[30px] md:w-[30px]' />
                </Link>
              </div>
            </div>

            <div className='p-4 text-center bg-zinc-50  rounded-sm'>
              <h3 className='text-zinc-800 text-base font-bold mb-[5px]'>
                {professional.name}
              </h3>
              <p className='text-blue-600 text-[15px]'>
                {professional.specialties
                  ? professional?.specialties[0]?.name
                  : "Especialidade não encontrada"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className='text-gray-500'>No professionals available.</p>
      )}
    </CardContainer>
  );
}
