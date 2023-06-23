export const cutTimes = (pDate: Date) => {
  const date = new Date(pDate);
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setMilliseconds(0);
  return date;
};
