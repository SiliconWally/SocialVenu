export interface EuropeanTime {
  hours: number;
  minutes: number;
}

export function compareEuropeanTime(item1: EuropeanTime, item2: EuropeanTime) {
  let result = item1.hours - item2.hours;

  if (result === 0) {
    result = item1.minutes - item2.minutes;
  }

  return result;
}
