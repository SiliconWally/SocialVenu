import { useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import { Thumbnail } from '../../../api/mockData/mockdata';

import styles from './ThumbnailSlider.module.css';

interface ThumbnailSliderProps {
  thumbnails: Thumbnail[];
  selectedIndex: number;
  changeSelectedIndex: (newSelectedIndex: number) => void;
}

export function ThumbnailSlider({ thumbnails, selectedIndex, changeSelectedIndex }: ThumbnailSliderProps) {
  const swiperInstance = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperInstance.current?.activeIndex !== selectedIndex) {
      swiperInstance.current?.slideTo(selectedIndex);
    }
  }, [selectedIndex]);

  const slidesJsx = thumbnails.map(({ id, thumbnail, tee_time }, index) => {
    let slideClassName = styles.slide;

    const distanceFromCenter = Math.abs(index - selectedIndex);

    if (distanceFromCenter === 0) {
      slideClassName += ` ${styles.activeSlide}`;
    } else if (distanceFromCenter === 1) {
      slideClassName += ` ${styles.distance1Slide}`;
    }

    return (
      <SwiperSlide key={id}>
        <div className={slideClassName} key={id}>
          <img src={thumbnail} alt={tee_time} />
        </div>
        <div className={styles.filler} />
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      initialSlide={selectedIndex}
      spaceBetween={80}
      slidesPerView={5}
      centeredSlides={true}
      slideToClickedSlide={true}
      onSlideChange={(swiper) => changeSelectedIndex(swiper.activeIndex)}
      onSwiper={(swiper) => {
        swiperInstance.current = swiper;
      }}
    >
      {slidesJsx}
    </Swiper>
  );
}
