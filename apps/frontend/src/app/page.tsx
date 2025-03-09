import React from "react";
import Hero from "@/components/sections/Hero";
import Blog from "@/components/sections/Blog";
import Sponsor from "@/components/sections/Sponsor";
import Professionals from "@/components/sections/Professionals";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Overview from "@/components/sections/Overview"

function page() {
  return (
    <>
      <Hero
        title='Cuidando do seu sorriso'
        subtitle='Bem-vindo a Clinica Odonto'
        buttonLabel='Agende Sua Consulta'
        isHome={true}
        description='Especializada em tratamentos odontológicos para melhorar o seu sorriso e a sua saúde. Eleve a sua autoestima, estamos nutrindo sorrisos, construindo confiança.'
      />
      <Services />
      <About />
      <Overview />
      <Professionals />
      <Contact />
      <Testimonials />
      <Blog />
      <Sponsor />
    </>
  );
}

export default page;
