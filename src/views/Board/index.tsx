import { useCallback, useEffect, useState } from 'react';
import { useGameManager } from '../../hooks/useGameManager';
import { useCharactersStore } from '../../store/useCharactersStore';
import CharacterCard from '../../components/CharacterCard';
import CharactersList from '../../components/CharactersList';
import Title from '../../components/Title';
import './Board.scss';

const Board = () => {
  const { characters } = useCharactersStore();
  const { board, selectedIndex, matchedIndex, handleFlipCard, turnsPlayed, matchedCount } =
    useGameManager(characters);
  const [showCards, setShowCards] = useState(true);

  const handleStartGame = useCallback(() => {
    const shuffleTimeout = setTimeout(() => {
      setShowCards(false);
      clearTimeout(shuffleTimeout);
    }, 3000);
  }, []);

  useEffect(() => handleStartGame, [handleStartGame]);

  return (
    <div className='board'>
      <header className='board__header'>
        <Title type='h2' size='lg' className='header-title'>
          Aciertos: {matchedCount}
        </Title>

        <Title type='h2' size='lg' className='header-title'>
          Turnos: {turnsPlayed}
        </Title>
      </header>

      <CharactersList>
        {board.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            isFlipped={showCards || index in selectedIndex || index in matchedIndex}
            onBackFaceClick={() => handleFlipCard(index)}
          />
        ))}
      </CharactersList>
    </div>
  );
};

export default Board;
