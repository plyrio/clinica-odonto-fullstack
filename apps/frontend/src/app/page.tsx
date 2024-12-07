"use client";
import React from "react";
{/*import Hero from "@/components/sections/Hero";*/}
import Blog from "@/components/sections/Blog";
import Sponsor from "@/components/sections/Sponsor";
import Professionals from "@/components/sections/Professionals";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import {HeroNovo} from "@/components/layout/HeroNovo";

function page() {
  return (
    <>
      <HeroNovo />
      {/*<Hero title="Cuide do seu sorriso"
        subtitle="Bem vindos a clínica odontosorrir"
        backgroundClass="hero-home"
        buttonLabel="Agende Sua Consulta"
        isHome={true}
        description="A clínica Odontosorrir é especializada em tratamentos odontológicos para melhorar o seu sorriso e a sua saúde. Nossa equipe é composta por profissionais altamente qualificados e dedicados" />*/}
      <Services />
      <About />
      <Professionals />
      <Contact />
      <Testimonials />
      <Blog />
      <Sponsor />
    </>
  );
}

export default page;
