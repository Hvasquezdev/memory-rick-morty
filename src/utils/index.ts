export const getRandomUniqueNumbers = (maxCount = 50, amountOfRequiredNumbers = 6) => {
  if (!maxCount) return [];

  const minAmountOfNumbers =
    maxCount > amountOfRequiredNumbers ? amountOfRequiredNumbers : maxCount;
  const ids: number[] = [];

  const numbers = Array.from({ length: maxCount }, (_, i) => i + 1);

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  ids.push(...numbers.slice(0, minAmountOfNumbers));

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
