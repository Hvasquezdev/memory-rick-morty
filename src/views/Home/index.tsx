import { useCharactersStore } from '../../store/useCharactersStore';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../../components/CharacterCard';
import CharactersList from '../../components/CharactersList';
import Title from '../../components/Title';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import './Home.scss';

const Home = () => {
  const { characters, loadingCharacters } = useCharactersStore();
  const orderedCharacters = useMemo(() => [...characters].sort((a, b) => a.id - b.id), [characters]);
  const navigate = useNavigate();

  return (
    <div className='home'>
      <Title type='h2' size='lg' className='home__title'>
        Personajes
      </Title>

      {loadingCharacters ? (
        <Loader />
      ) : (
        <div className='home__content'>
          <CharactersList>
            {orderedCharacters.map((character, key) => (
              <CharacterCard character={character} key={key} isFlipped />
            ))}
          </CharactersList>

          <div className='home-actions'>
            <Button onClick={() => navigate('/board')}>Jugar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
