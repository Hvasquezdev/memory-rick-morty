import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../../components/CharacterCard';
import CharactersList from '../../components/CharactersList';
import Title from '../../components/Title';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { useGameStore } from '../../store/useGameStore';
import { useCharactersRandomIds } from '../../hooks/useCharactersRandomIds';
import { useCharactersByIds } from '../../hooks/useCharactersByIds';
import './Home.scss';

const Home = () => {
  const { ids, loading: isLoadingIds } = useCharactersRandomIds();
  const { characters, loading: isLoadingCharacters } = useCharactersByIds(ids);
  const { setCharacters, characters: savedCharacters, setIsPlaying } = useGameStore();

  const orderedCharacters = useMemo(
    () => [...savedCharacters].sort((a, b) => a.id - b.id),
    [savedCharacters],
  );
  const navigate = useNavigate();

  const isLoading = isLoadingIds || isLoadingCharacters;

  const handleStartGame = () => {
    setIsPlaying(true);
    navigate('/board');
  };

  useEffect(() => {
    if (characters.length) {
      setCharacters([...characters, ...characters]);
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
            {orderedCharacters.map((character, key) => (
              <CharacterCard character={character} key={key} isFlipped />
            ))}
          </CharactersList>

          <div className='home-actions'>
            <Button onClick={handleStartGame}>Jugar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
