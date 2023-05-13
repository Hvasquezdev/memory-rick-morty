import { Character } from '../../hooks/useCharactersByIds';
import Title from '../Title';
import rickAndMortyPortal from '../../assets/img/ricky_morty_img.png';
import './CharacterCard.scss';

interface CharacterCardProps {
  character: Character;
  isFlipped?: boolean;
  onBackFaceClick?: () => void;
}

const CharacterCard = ({ character, isFlipped, onBackFaceClick }: CharacterCardProps) => {
  const flippedClassName = isFlipped ? 'character-card--flipped' : '';

  return (
    <div className={`character-card ${flippedClassName}`}>
      <div className='character-card__face character-card__face--front'>
        <img
          className='character-thumb'
          src={character.image}
          alt={character.name}
          width={180}
          height={180}
        />

        <div className='character-details'>
          <Title type='h4' size='sm' className='character-details__name'>
            {character.name}
          </Title>

          <p className='character-details__status'>
            {character.status} - {character.species}
          </p>
        </div>
      </div>

      <div className='character-card__face character-card__face--back' onClick={onBackFaceClick}>
        <img
          className='back-logo'
          src={rickAndMortyPortal}
          alt='Rick and morty portal'
          width={180}
          height={180}
        />
      </div>
    </div>
  );
};

export default CharacterCard;
