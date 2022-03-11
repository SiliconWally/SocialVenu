import { useMemo, useState } from 'react';

import { TeeTimesSlider } from '../../common/components/TeeTimesSlider/TeeTimesSlider';
import { ThumbnailSlider } from '../../common/components/ThumbnailSlider/ThumbnailSlider';
import { findLastIndex, isUnique } from '../../utils/general';
import { compareEuropeanTime } from '../../utils/time';
import { mockdata, Thumbnail } from '../../api/mockData/mockdata';

import styles from './Home.module.css';

interface ExtendedThumbnail extends Thumbnail {
  hours: number;
  minutes: number;
  timeSlot: string;
}

export function Home() {
  const thumbnails = useMemo<ExtendedThumbnail[]>(
    () =>
      mockdata
        .map((item) => {
          const [hours, minutes] = item.tee_time.split(':');

          return {
            ...item,
            hours: parseInt(hours),
            minutes: parseInt(minutes),
            timeSlot: item.tee_time.slice(0, -1) + '0',
          };
        })
        .sort(compareEuropeanTime),
    [mockdata],
  );

  const timeSlots = useMemo(() => thumbnails.map((item) => item.timeSlot).filter(isUnique), [thumbnails]);

  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(timeSlots.length - 1);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(thumbnails.length - 1);

  function changeSelectedTimeSlotIndex(newIndex: number) {
    const lastThubnailInTimeSlotIndex = findLastIndex(thumbnails, (item) => item.timeSlot === timeSlots[newIndex]);

    if (lastThubnailInTimeSlotIndex > -1) {
      setSelectedThumbnailIndex(lastThubnailInTimeSlotIndex);
    }

    setSelectedTimeSlotIndex(newIndex);
  }

  function changeSelectedThumbnailIndex(newIndex: number) {
    const timeSlotOfThumbnailIndex = timeSlots.indexOf(thumbnails[newIndex].timeSlot);

    if (timeSlotOfThumbnailIndex > -1) {
      setSelectedTimeSlotIndex(timeSlotOfThumbnailIndex);
    }

    setSelectedThumbnailIndex(newIndex);
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Time of your shot <span className={styles.subtitle}>(estimated)</span>
      </h1>
      <div className={styles.teeTimesContainer}>
        <TeeTimesSlider
          timeSlots={timeSlots}
          selectedIndex={selectedTimeSlotIndex}
          changeSelectedIndex={changeSelectedTimeSlotIndex}
        />
      </div>
      <div className={styles.thumbnailsContainer}>
        <ThumbnailSlider
          thumbnails={thumbnails}
          selectedIndex={selectedThumbnailIndex}
          changeSelectedIndex={changeSelectedThumbnailIndex}
        />
      </div>
    </main>
  );
}
