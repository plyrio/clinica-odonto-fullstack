import React from "react";

export const HeroNovo = () => {
  return (
    <section className=' relative bg-hero-home bg-no-repeat bg-center bg-cover text-white'>

      <div className='z-50 mx-auto max-w-screen-xl px-4 py-32 md:flex md:h-[565px] md:items-center'>
              
        <div className='mx-auto max-w-3xl text-center justify-end md:pt-32'>
          <h1 className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-white sm:text-5xl'>
            Understand User Flow.
            <span className='sm:block'> Increase Conversion. </span>
          </h1>

          <p className='mx-auto mt-4 max-w-xl sm:text-xl/relaxed'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <a
              className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
              href='#'>
              Get Started
            </a>

            <a
              className='block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto'
              href='#'>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
