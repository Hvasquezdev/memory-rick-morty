import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRandomUniqueNumbers } from '../utils';
import { Character } from './useCharactersByIds';

type IndexRecord = { [key: number]: number };

const useGameManager = (characters: Character[] = []) => {
  const [board, setBoard] = useState<Character[]>([]);
  const [matchedIndex] = useState<IndexRecord>({});
  const [selectedIndex, setSelectedIndex] = useState<IndexRecord>({});
  const [turnsPlayed] = useState(0);

  const matchedCount = useMemo(() => {
    return Object.keys(matchedIndex).length / 2
  }, [matchedIndex]);

  const isWinner = useMemo(
    () => characters.length && Object.keys(matchedIndex).length === characters.length,
    [matchedIndex, characters],
  );

  const shuffleCharacters = useCallback(() => {
    const randomIndex = getRandomUniqueNumbers(characters.length, characters.length, 2);
    const randomizedCharacters = randomIndex.map((index) => characters[index - 1]);

    setBoard(randomizedCharacters);
  }, [characters]);

  const handleFlipCard = (index: number) => {
    setSelectedIndex((state) => ({
      ...state,
      [index]: index,
    }));
  };

  const handleResetSelectedIndex = () => {
    setSelectedIndex({});
  };

  useEffect(() => {
    setBoard(characters);
  }, [characters]);

  return {
    board,
    selectedIndex,
    matchedIndex,
    handleFlipCard,
    isWinner,
    turnsPlayed,
    matchedCount,
    shuffleCharacters,
    handleResetSelectedIndex,
  };
};

export { useGameManager };
