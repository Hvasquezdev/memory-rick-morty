export const getRandomUniqueNumbers = (maxCount = 50, amountOfRequiredNumbers = 6) => {
  if (!maxCount) return [];

  const minAmountOfNumbers =
    maxCount > amountOfRequiredNumbers ? amountOfRequiredNumbers : maxCount;
  const ids: number[] = [];

  while (ids.length < minAmountOfNumbers) {
    const number = Math.floor(Math.random() * maxCount) + 1;
    const isIdSaved = ids.some((id) => id === number);

    if (!isIdSaved) {
      ids.push(number);
    }
  }

  return ids;
};

export const classNames = (classesObj: { [key: string]: boolean }) => {
  const classes = Object.entries(classesObj)
    .map((item) => {
      const [key, value] = item;

      if (!key || !value) return '';
      return key.trim();
    })
    .join(' ');

  return classes.length ? classes : '';
};
