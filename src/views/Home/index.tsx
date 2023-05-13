import { useCharactersStore } from '../../store/useCharactersStore';
import CharacterCard from '../../components/CharacterCard';
import CharactersList from '../../components/CharactersList';
import Title from '../../components/Title';
import Loader from '../../components/Loader';
import './Home.scss';
import Button from '../../components/Button';

const Home = () => {
  const { characters, loadingCharacters } = useCharactersStore();

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
            {characters.map((character, key) => (
              <CharacterCard character={character} key={key} isFlipped />
            ))}
          </CharactersList>

          <div className="home-actions">
            <Button>
              Jugar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
