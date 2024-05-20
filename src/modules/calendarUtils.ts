export const getDaysArray = (
  year: number,
  month: number,
): (number | null)[] => {
  let daysArray: (number | null)[] = [];
  const firstDay = new Date(year, month - 1, 1).getDay();
  const numDays = new Date(year, month, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  for (let i = 1; i <= numDays; i++) {
    daysArray.push(i);
  }

  while (daysArray.length % 7 !== 0) {
    daysArray.push(null);
  }

  return daysArray;
};

export const splitWeeks = (
  daysArray: (number | null)[],
): (number | null)[][] => {
  let weeks: (number | null)[][] = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }
  return weeks;
};

export const formatDateKey = (
  year: number,
  month: number,
  day: number | null,
) => {
  if (day === null) {
    return null;
  }
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
};
