import React from "react";
import Image from "next/image";
import Card from "../layout/GridContainer";
import {ResponseEmployeeDto} from "@odonto/core"

export default async function ProfessionalsCard() {
  const data = await fetch("https://cof-backend.onrender.com/employee");
  const professionals: ResponseEmployeeDto[] = await data.json();

  return (
    <Card>
      {professionals.map((prof) => (
        <div key={prof.id} className='w-full max-w-xs text-center'>
          <Image
            width={64}
            height={64}
            className='object-cover object-center w-full h-96 mx-auto rounded-lg'
            src={prof.imgUrl || `https://media.istockphoto.com/id/1371009338/pt/foto/portrait-of-confident-a-young-dentist-working-in-his-consulting-room.jpg?s=1024x1024&w=is&k=20&c=lay2vHehOOHac_fTrq2ovOwLurc6WSJxWm1Kw4iqun0=`}
            alt={`avatar de ${prof.name}`}
          />

          <div className='mt-2'>
            <h3 className='text-lg font-medium text-gray-700 dark:text-gray-200'>
              {prof.name}
            </h3>
            <span className='mt-1 font-medium text-gray-600 dark:text-gray-300'>
              {prof.role}
            </span>
          </div>
        </div>
      ))}
    </Card>
  );
}
