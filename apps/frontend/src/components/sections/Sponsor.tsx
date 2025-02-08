'use client'
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Autoplay} from "swiper/modules";
import Image from "next/image";
import Section from "../layout/Section";
import TitlesSection from "../utils/TitlesSection";

const sponsorList = [
  {
    imgUrl: "/src/assets/images/sponsor/01.webp"
  },
  {
    imgUrl: "/src/assets/images/sponsor/02.webp"
  },
  {
    imgUrl: "/src/assets/images/sponsor/03.webp"
  },
  {
    imgUrl: "/src/assets/images/sponsor/04.webp"
  },
  {
    imgUrl: "/src/assets/images/sponsor/05.webp"
  },
  {
    imgUrl: "/src/assets/images/sponsor/06.webp"
  }
];

export default function Sponsor() {
  return (
    <Section noContainer={true} className='bg-gray-200'>
      <TitlesSection title="Patrocinadores"></TitlesSection>
    <div className='w-full h-full lg:container mx-auto'>
        <div className=' lg:container mx-auto'>
        <div className='section-wrapper'>
          <div className='sponsor-slider mx-auto items-center justify-center'>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50
                },
                1440: {
                  slidesPerView: 4,
                  spaceBetween: 50
                }
              }}
              modules={[Autoplay]}
              className='mySwiper '>
              {sponsorList.map((val, i) => (
                <SwiperSlide key={i}>
                  <div className="flex mx-auto justify-center items-center bg-white w-full h-24">
                    <Image
                      height={286}
                      width={286}
                      src={val.imgUrl}
                      alt=""
                      className="object-contain h-full w-auto"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
    </Section>
  );
}
