'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Section from "../ui/layout/Section";
import TitlesSection from "../ui/layout/TitlesSection";

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
    <Section noContainer={true} className='bg-zinc-300/15 py-12'>
      <TitlesSection title="Patrocinadores"></TitlesSection>
      <div className='block w-full relative mx-auto container'>
        <div className='relative overflow-hidden '>
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
                    slidesPerView: 3,
                    spaceBetween: 20
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 30
                  }
                }}
                modules={[Autoplay]}
                className='mySwiper '>
                {sponsorList.map((val, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex justify-center items-center bg-white w-full h-24 p-0 my-0 mx-4">
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
