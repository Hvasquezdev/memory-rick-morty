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

const getRandomPercentage = () => {
  return Math.floor(Math.random() * 101);
};

export const generateRandomBorderRadius = () => {
  const top = getRandomPercentage();
  const bottom = getRandomPercentage();
  const left = getRandomPercentage();
  const right = getRandomPercentage();

  const borderRadiusNew = `${top}% ${100 - top}% ${100 - bottom}% ${bottom}% / ${100 - left}% ${
    100 - right
  }% ${right}% ${left}%`;

  return borderRadiusNew;
};
