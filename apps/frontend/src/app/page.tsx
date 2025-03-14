import React from 'react';
import Hero from '@/components/sections/Hero';
import Blog from '@/components/sections/Blog';
import Sponsor from '@/components/sections/Sponsor';
import Professionals from '@/components/sections/Professionals';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import Counter from '@/components/sections/Counter';
import Testimonials from '@/components/sections/Testimonials';
import Overview from '@/components/sections/Overview';
import Hire from '@/components/sections/Hire';

function page() {
 return (
  <>
   <Hero
    title='Cuidando do seu sorriso'
    subtitle='Bem-vindo á Odonto+'
    buttonLabel='Agende Sua Consulta'
    isHome={true}
    description='Especializada em tratamentos odontológicos para melhorar o seu sorriso e a sua saúde. Eleve a sua autoestima, estamos nutrindo sorrisos, construindo confiança.'
   />
   <Services />
   <Counter />
   <Overview />
   <Contact />
   <Professionals />
   <Testimonials />
   <Hire />
   <Blog />
   <Sponsor />
  </>
 );
}

export default page;
