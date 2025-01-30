import { useCallback, useEffect, useState } from 'react';
import CharacterCard from '../../components/CharacterCard';
import CharactersList from '../../components/CharactersList';
import Title from '../../components/Title';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { useGameStore } from '../../store/useGameStore';
import { useCharactersRandomIds } from '../../hooks/useCharactersRandomIds';
import { useCharactersByIds } from '../../hooks/useCharactersByIds';
import { useGameManager } from '../../hooks/useGameManager';
import './Home.scss';

const Home = () => {
  const { ids, loading: isLoadingIds } = useCharactersRandomIds();
  const { characters, loading: isLoadingCharacters } = useCharactersByIds(ids);
  const { setCharacters } = useGameStore();

  const {
    board,
    selectedIndex,
    matchedIndex,
    handleFlipCard,
    shuffleCharacters,
    handleResetSelectedIndex,
  } = useGameManager(characters);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'starting'>('idle');

  const handleStartGame = useCallback(() => {
    handleResetSelectedIndex();
    setGameStatus('starting');

    const initialTimeout = setTimeout(() => {
      shuffleCharacters();
      setShouldAnimate(true);
      clearTimeout(initialTimeout);

      const shuffleTimeout = setTimeout(() => {
        setShouldAnimate(false);
        setGameStatus('playing');
        clearTimeout(shuffleTimeout);
      }, 3000);
    }, 500);
  }, [shuffleCharacters, handleResetSelectedIndex]);

  const isLoading = isLoadingIds || isLoadingCharacters;

  useEffect(() => {
    if (characters.length) {
      setCharacters([...characters]);
    }
  }, [characters, setCharacters]);

  return (
    <div className='home'>
      <Title type='h2' size='lg' className='home__title'>
        Personajes
      </Title>

      {isLoading ? (
        <Loader />
      ) : (
        <div className='home__content'>
          <CharactersList>
            {board.map((character, index) => (
              <CharacterCard
                key={character.id}
                index={index + 1.5}
                character={character}
                shouldAnimate={shouldAnimate}
                isFlipped={index in selectedIndex}
                isMatched={index in matchedIndex}
                onBackFaceClick={() => gameStatus === 'playing' && handleFlipCard(index)}
              />
            ))}
          </CharactersList>

          <div className='home-actions'>
            <Button onClick={handleStartGame} isDisabled={gameStatus === 'starting'}>
              {gameStatus === 'idle'
                ? 'Iniciar'
                : gameStatus === 'starting'
                ? 'Barajando'
                : 'Reiniciar'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
