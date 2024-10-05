import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';


const sponsorList = [
    {
        imgUrl: "/src/assets/images/sponsor/01.webp",
    },
    {
        imgUrl: "/src/assets/images/sponsor/02.webp",
    },
    {
        imgUrl: "/src/assets/images/sponsor/03.webp",
    },
    {
        imgUrl: "/src/assets/images/sponsor/04.webp",
    },
    {
        imgUrl: "/src/assets/images/sponsor/05.webp",
    },
    {
        imgUrl: "/src/assets/images/sponsor/06.webp",
    },
];

export default function Sponsor() {
    return (
        <div className='w-full h-full'>
            <div className="bg-gray-200">
                <div className="section-wrapper">
                    <div className="sponsor-slider">
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={20}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 50,
                                },
                            }}
                            modules={[Autoplay]}
                            className="mySwiper h-full"
                        >
                            {
                                sponsorList.map((val, i) =>(
                                    <SwiperSlide key={i}>
                                        <div className="h-full">
                                            <Image height={86} width={86} src={val.imgUrl} alt="" className='' />
                                        </div>

                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}
