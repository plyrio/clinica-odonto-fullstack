"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "../layout/GridContainer";
import { ResponseEmployeeDto } from "@odonto/core";

export default function ProfessionalsCard() {

  const [professionals, setProfessionals] = useState<ResponseEmployeeDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfessionals = async () => {
      const res = await fetch("https://cof-backend.onrender.com/employee", { cache: "no-store" });
      const data: ResponseEmployeeDto[] = await res.json();
      setProfessionals(data);
      setLoading(false);
    };

    fetchProfessionals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium text-gray-700">Carregando...</div>

      </div>
    );
  }

  const doctors = professionals.filter((prof) => prof.role?.includes("DOCTOR"));

  return (
    <Card>
      {doctors.map((doctor) => (
        <div key={doctor.id} className="w-full max-w-xs text-center">
          <Image
            width={64}
            height={64}
            className="object-cover object-center w-full h-96 mx-auto rounded-lg"
            src={doctor.imgUrl || ""}
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
