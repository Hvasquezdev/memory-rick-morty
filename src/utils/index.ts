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
