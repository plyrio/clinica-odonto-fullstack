import React from "react";
import Section from "../layout/Section";
import Form from "../form/Form";

export default function Contact() {
  return (
    <Section
      noContainer={true} 
      classNameContainer='relative z-10 p-0 bg-banner bg-center bg-no-repeat md:flex bg-cover '>
      <div className='absolute inset-0 bg-slate-900 opacity-50 -z-10'></div>
      <div className='relative lg:flex flex-col justify-center w-full p-8  lg:px-12 xl:px-32 lg:w-1/2 bg-cover bg-contact hidden '></div>

      <div className='relative flex flex-col justify-center w-full container  mx-auto p-8 pt-0 lg:w-1/2 lg:px-12 xl:px-24 '>
        <Form />
      </div>
    </Section>
  );
}
