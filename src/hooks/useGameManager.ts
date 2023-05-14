import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getRandomUniqueNumbers } from '../utils';
import { Character } from './useCharactersByIds';

const useGameManager = (characters: Character[] = []) => {
  const [board, setBoard] = useState<Character[]>([]);
  const [matchedIndex, setMatchedIndex] = useState<{ [key: number]: number }>({});
  const [selectedIndex, setSelectedIndex] = useState<{ [key: number]: number }>({});
  const [turnsPlayed, setTurnsPlayed] = useState(0);

  const matchedCount = useMemo(() => {
    return Object.keys(matchedIndex).length / 2
  }, [matchedIndex]);

  const isWinner = useMemo(
    () => characters.length && Object.keys(matchedIndex).length === characters.length,
    [matchedIndex, characters],
  );

  const shuffleCharacters = useCallback(() => {
    const randomIndex = getRandomUniqueNumbers(characters.length, characters.length);
    const randomizedCharacters = randomIndex.map((index) => characters[index - 1]);

    setBoard(randomizedCharacters);
  }, [characters]);

  const handleFlipCard = (index: number) => {
    if (Object.keys(selectedIndex).length < 2) {
      setSelectedIndex((state) => ({
        ...state,
        [index]: index,
      }));
    }
  };

  const handleResetGame = () => {
    setMatchedIndex({});
    setSelectedIndex({});
    setTurnsPlayed(0);
    shuffleCharacters();
  };

  const cardFlippedTimeout: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    clearTimeout(cardFlippedTimeout.current as NodeJS.Timeout);
    const selectedKeys = Object.keys(selectedIndex);

    if (selectedKeys.length < 2) return;

    const [firstIndex, secondIndex] = selectedKeys;
    const firstSelection = board[Number(selectedKeys[0])];
    const secondSelection = board[Number(selectedKeys[1])];

    if (firstSelection.id === secondSelection.id) {
      setMatchedIndex((state) => ({
        ...state,
        [firstIndex]: firstIndex,
        [secondIndex]: secondIndex,
      }));
    }

    setTurnsPlayed((turns) => turns += 1);

    cardFlippedTimeout.current = setTimeout(() => {
      setSelectedIndex({});
    }, 1000);
  }, [selectedIndex, board]);

  useEffect(() => {
    shuffleCharacters();
  }, [characters, shuffleCharacters]);

  return {
    board,
    selectedIndex,
    matchedIndex,
    handleFlipCard,
    isWinner,
    turnsPlayed,
    matchedCount,
    resetGame: handleResetGame,
  };
};

export { useGameManager };
