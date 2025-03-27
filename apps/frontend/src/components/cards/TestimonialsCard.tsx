"use client";
import Image from "next/image";
import React from "react";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import {IconStar, IconStarFilled} from "@tabler/icons-react";
import {TESTIMONIALS_INFO} from "../../data/TestimonialsData";

export default function TestimonialsCard() {
  return (
  <Swiper
    slidesPerView={1}
    spaceBetween={5}
    autoplay={true}
    pagination={{clickable: true}}
    breakpoints={{
    640: {slidesPerView: 1, spaceBetween: 0},
    768: {slidesPerView: 2, spaceBetween: 5},
    1024: {slidesPerView: 3, spaceBetween: 5},
    1440: { slidesPerView: 4, spaceBetween: 5},
    }}
    navigation={true}
    modules={[Pagination, Navigation, Autoplay]}
    className='container  h-[440px]  '>
      {TESTIMONIALS_INFO.map((testimonial, index) => (
    <SwiperSlide key={index} className='h-full flex px-0 md:px-3'>
          <div className='flex h-full w-full lg:px-0 px-3.5'>
            <div className='relative flex flex-col h-full bg-white shadow-md border border-sm rounded-md p-6'>
              <div className='mb-4 flex justify-center'>
                <ul className='flex'>
                  {[...Array(5)].map((_, i) => (
      <li key={i}>
                      {i < testimonial.rating ? (
        <IconStarFilled className='text-yellow-400 text-lg' />
        ): (
        <IconStar className='text-yellow-400 text-lg' />
        )}
                    </li>
      ))}
    </ul>
    </div>

              {/* Texto */}
              <div className='text-center flex flex-grow'>
                <p className='text-gray-700 italic leading-relaxed'>
                  {testimonial.content}
      </p>
    </div>
              <div className='mx-auto my-4 flex'>
                <Image
        src={testimonial.imgUrl}
        height={256}
        width={256}
        alt={testimonial.name}
        className='w-[90px] h-[90px] rounded-full border-4 border-gray-100'
        />
    </div>

              {/* Nome e função */}
              <div className='text-center flex flex-col'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  {testimonial.name}
                </h3>
                <span className='text-sm text-gray-600'>Paciente</span>
    </div>
    </div>
    </div>
        </SwiperSlide>
    ))}
    </Swiper>
  );
  }