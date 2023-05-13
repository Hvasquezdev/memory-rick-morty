import { useCharactersStore } from '../../store/useCharactersStore';
import CharacterCard from '../../components/CharacterCard';
import CharactersList from '../../components/CharactersList';
import Title from '../../components/Title';
import './Home.scss';

const Home = () => {
  const { characters } = useCharactersStore();

  return (
    <div className='home'>
      <Title type='h2' size='lg' className='home__title'>
        Personajes
      </Title>

      <CharactersList>
        {characters.map((character, key) => (
          <CharacterCard character={character} key={key} isFlipped />
        ))}
      </CharactersList>
    </div>
  );
};

export default Home;
