import React, { useState } from "react";
import styles from "./ProjectMosaic.module.scss";
import classNames from "classnames/bind";
import Image from "next/future/image";

const cx = classNames.bind(styles)

interface Props {
    images: Array<string>
}
const ProjectMosaic:React.FC<Props> = ({ images }) => {

  return (
    <>
      <div className={cx("project-mosaic" , "padding-horizontal margin-v-10")}>
        <div className="max-width-6 mx-auto">
          <div className={cx("project-mosaic-grid-wrapper")}>
            <div className={cx("project-mosaic-grid")}>
              <div className={cx("project-mosaic-images", `project-mosaic-images--${images.length}-items`)}>
                {images.map((item, index) => (
                  <div key={index} className={cx("image-item", `image-item-${index + 1}`)}>
                    <Image src={item} alt="project-mosaic-item" width={1000} height={1000} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProjectMosaic;
