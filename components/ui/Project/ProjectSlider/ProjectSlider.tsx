import React from "react";
import Image from "next/future/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";


// install Swiper modules
SwiperCore.use([Navigation, Pagination, A11y]);

interface Props {
    buttonColor: string;
    projectSliderImages: Array<string>
}

const ProjectSlider:React.FC<Props> = ({ projectSliderImages, buttonColor }) => {
  return (
    <div className="project-slider">
      <div className="project-slider-wrapper mx-auto">
        <Swiper spaceBetween={0} slidesPerView={1} navigation={{ nextEl: "#btn-next", prevEl: "#btn-prev" }} grabCursor={true} pagination={{ el: "#pagination",  clickable: true }}>
          {projectSliderImages.map((image:string, index:number) => (
            <SwiperSlide key={index}>
              <div className="project-slider-item">
                <div className="image-wrap">
                  <Image src={image} alt="project-slider" width={1920} height={1080}  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="project-slider-pagination" id="pagination" data-cursor-type="none"></div>
        <div className="project-slider-navigation">
          <div id="btn-prev" className="btn-prev" style={{backgroundColor: buttonColor}} data-cursor-type="none"></div>
          <div id="btn-next" className="btn-next" style={{backgroundColor: buttonColor}} data-cursor-type="none"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSlider;
