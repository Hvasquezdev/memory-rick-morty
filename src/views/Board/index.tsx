import { useCallback, useEffect, useState } from 'react';
import { useGameManager } from '../../hooks/useGameManager';
import { useGameStore } from '../../store/useGameStore';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../../components/CharacterCard';
import CharactersList from '../../components/CharactersList';
import Title from '../../components/Title';
import './Board.scss';

const Board = () => {
  const { setIsWinner, setTurnsPlayed, characters } = useGameStore();
  const {
    board,
    selectedIndex,
    matchedIndex,
    handleFlipCard,
    turnsPlayed,
    matchedCount,
    isWinner,
  } = useGameManager(characters);
  const [showCards, setShowCards] = useState(true);
  const navigate = useNavigate();

  const handleStartGame = useCallback(() => {
    const shuffleTimeout = setTimeout(() => {
      setShowCards(false);
      clearTimeout(shuffleTimeout);
    }, 3000);
  }, []);

  const handleEndGame = useCallback(() => {
    setIsWinner(true);
    setTurnsPlayed(turnsPlayed);
    navigate('/results');
  }, [turnsPlayed, setIsWinner, setTurnsPlayed, navigate]);

  useEffect(() => {
    handleStartGame();
  }, [handleStartGame]);

  useEffect(() => {
    if (isWinner) {
      const isWinnerTimeout = setTimeout(() => {
        handleEndGame();
        clearTimeout(isWinnerTimeout);
      }, 1200);
    }
  }, [isWinner, handleEndGame]);

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
            isFlipped={showCards || index in selectedIndex}
            isMatched={index in matchedIndex}
            onBackFaceClick={() => handleFlipCard(index)}
          />
        ))}
      </CharactersList>
    </div>
  );
};

export default Board;
