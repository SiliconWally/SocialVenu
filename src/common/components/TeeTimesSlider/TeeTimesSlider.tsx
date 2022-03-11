import { useEffect, useRef, useState } from 'react';

import styles from './TeeTimesSlider.module.css';

interface TeeTimesSliderProps {
  timeSlots: string[];
  selectedIndex: number;
  changeSelectedIndex: (newSelectedIndex: number) => void;
}

export function TeeTimesSlider({ timeSlots, selectedIndex, changeSelectedIndex }: TeeTimesSliderProps) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isFirstLoad) {
      const offset = (sliderRef.current?.querySelector(`.${styles.slide}:nth-child(${selectedIndex})`) as HTMLElement)
        ?.offsetLeft;

      sliderRef.current?.scroll({ left: offset, behavior: 'smooth' });
    }
  }, [selectedIndex]);

  useEffect(() => {
    sliderRef.current?.scroll({ left: 999999 });
    setIsFirstLoad(false);
  }, []);

  const slidesJsx = timeSlots.map((timeSlot, index) => {
    let slideClassName = styles.slide;

    const isActive = index === selectedIndex;

    if (isActive) {
      slideClassName += ` ${styles.activeSlide}`;
    }

    return (
      <div className={slideClassName} onClick={() => changeSelectedIndex(index)} key={timeSlot}>
        <p className={styles.time}>{timeSlot}</p>
      </div>
    );
  });

  return (
    <div className={styles.slider} ref={sliderRef}>
      {slidesJsx}
    </div>
  );
}
