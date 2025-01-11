import React from "react";
import Hero from "@/components/sections/Hero";
import Blog from "@/components/sections/Blog";
import Sponsor from "@/components/sections/Sponsor";
import Professionals from "@/components/sections/Professionals";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";

function page() {
  return (
    <>
      <Hero
        title='Nutrindo Sorrisos,'
        subtitle='Construindo Confiança'
        backgroundClass='hero-home'
        buttonLabel='Agende Sua Consulta'
        isHome={true}
        description='Especializada em tratamentos odontológicos para melhorar o seu sorriso e a sua saúde.'
      />
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
