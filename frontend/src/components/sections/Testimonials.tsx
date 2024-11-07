import React, { useRef, useState } from 'react'
import Section from '../layout/Section'
import TitlesSection from '../utils/TitlesSection'
import TestimonialsCard from '../cards/TestimonialsCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

export default function Testimonials() {
  return (
    <Section>
      <TitlesSection title='Nosso Feedback' subtitle='Nossos Pacientes Dizem' />

      <>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </>
      <TestimonialsCard />


    





    </Section>
  )
}

