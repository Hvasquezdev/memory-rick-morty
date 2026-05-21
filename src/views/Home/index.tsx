import { useCallback, useEffect, useState } from 'react';
import CharacterCard from '../../components/CharacterCard';
import CharactersList from '../../components/CharactersList';
import Title from '../../components/Title';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { useGameStore } from '../../store/useGameStore';
import { useCharactersRandomIds } from '../../hooks/useCharactersRandomIds';
import { Character, useCharactersByIds } from '../../hooks/useCharactersByIds';
import { useGameManager } from '../../hooks/useGameManager';
import { TEAMS, TEAMS_LABEL } from '../../constants/teams';
import './Home.scss';

const getPosition = (characters: Character[], character: Character) => {
  return characters.findIndex((char) => char.id === character.id) + 1;
};

const Home = () => {
  const [team, setTeam] = useState<keyof typeof TEAMS | null>(null);
  const totalCharacters = team ? TEAMS[team].length : null;
  const { ids, loading: isLoadingIds } = useCharactersRandomIds({
    totalCharacters: totalCharacters ?? 4,
    shouldFetch: !!totalCharacters,
  });
  const {
    characters,
    charactersOffDays,
    loading: isLoadingCharacters,
  } = useCharactersByIds(ids, team || 'CHARLIES');
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
  const [flippedCharacters, setFlippedCharacters] = useState<Character[]>([]);

  const handleStartGame = useCallback(() => {
    handleResetSelectedIndex();
    setGameStatus('starting');

    const initialTimeout = setTimeout(() => {
      setFlippedCharacters([]);
      shuffleCharacters();
      setShouldAnimate(true);
      clearTimeout(initialTimeout);

      const shuffleTimeout = setTimeout(
        () => {
          setShouldAnimate(false);
          setGameStatus('playing');
          clearTimeout(shuffleTimeout);
        },
        characters?.length ? characters.length * 550 : 2000,
      );
    }, 500);
  }, [shuffleCharacters, characters, handleResetSelectedIndex]);

  const isLoading = isLoadingIds || isLoadingCharacters;

  useEffect(() => {
    if (characters.length) {
      setCharacters([...characters]);
    }
  }, [characters, setCharacters]);

  const handleResetGame = useCallback(() => {
    setTeam(null);
    handleResetSelectedIndex();
    setFlippedCharacters([]);
    setGameStatus('idle');
    setShouldAnimate(false);
  }, [handleResetSelectedIndex]);

  return (
    <div className='home'>
      <header className='home__header'>
        <Title type='h2' size='lg' className='home__title'>
          {!team ? 'Selecciona un equipo' : TEAMS_LABEL[team]}
        </Title>

        {!!team && (
          <Button size='sm' isDisabled={isLoading || gameStatus === 'starting'} onClick={handleResetGame}>
            Cambiar equipo
          </Button>
        )}
      </header>

      {!team && (
        <section className='home__gameMode'>
          <Button onClick={() => setTeam('CHARLIES')}>{TEAMS_LABEL['CHARLIES']}</Button>
          <Button onClick={() => setTeam('X_AI')}>{TEAMS_LABEL['X_AI']}</Button>
        </section>
      )}

      {isLoading && !!team && <Loader />}

      {!isLoading && !!team && (
        <div className='home__content'>
          <CharactersList>
            {board.map((character, index) => (
              <CharacterCard
                key={character.id}
                index={index + 0.5}
                position={getPosition(flippedCharacters, character)}
                character={character}
                shouldAnimate={shouldAnimate}
                isFlipped={index in selectedIndex}
                isMatched={index in matchedIndex}
                onBackFaceClick={() => {
                  if (gameStatus === 'playing') {
                    setFlippedCharacters([...flippedCharacters, character]);
                    handleFlipCard(index);
                  }
                }}
              />
            ))}

            {charactersOffDays.map((character) => (
              <CharacterCard key={character.id} character={character} isFlipped={true} />
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
