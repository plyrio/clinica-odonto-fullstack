import Image from "next/image";
import Card from "../layout/GridContainer";
import { ResponseEmployeeDto } from "@odonto/core";


async function fetchProfessionals(): Promise<ResponseEmployeeDto[]> {
  const res = await fetch("https://cof-backend.onrender.com/employee", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch professionals");
  }
  return res.json();
}


export default async function ProfessionalsCard() {
  const professionals = await fetchProfessionals();

  
  const doctors = professionals.filter((prof) => prof.role?.includes("DOCTOR"));

  return (
    <Card>
      {doctors.map((doctor) => (
        <div key={doctor.id} className="w-full max-w-xs text-center">
          <Image
            width={640}
            height={640}
            className="object-cover object-center w-full h-96 mx-auto rounded-lg"
            src={doctor.imgUrl || "https://images.stockcake.com/public/d/7/7/d77cdbe5-5fd2-49d4-b737-9e07d352f32b/dentist-holding-tools-stockcake.jpg"}
            alt={`avatar de ${doctor.name}`}
          />
          <div className="mt-2">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{doctor.name}</h3>
            <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">Doctor</span>
          </div>
        </div>
      ))}
    </Card>
  );
}
