import { Character } from '../../hooks/useCharactersByIds';
import Title from '../Title';
import rickAndMortyPortal from '../../assets/img/ricky_morty_img.png';
import './CharacterCard.scss';
import { classNames } from '../../utils';
import { useMemo } from 'react';

interface CharacterCardProps {
  index?: number;
  position?: number;
  shouldAnimate?: boolean;
  character: Character;
  isFlipped?: boolean;
  isMatched?: boolean;
  onBackFaceClick?: () => void;
}

const CharacterCard = ({
  index,
  position,
  character,
  shouldAnimate,
  isFlipped,
  isMatched,
  onBackFaceClick,
}: CharacterCardProps) => {
  const customClassNames = useMemo(
    () =>
      classNames({
        'character-card--flipped': !!isFlipped,
        'character-card--matched': !!isMatched,
        'character-card--animated': !!shouldAnimate && index !== undefined,
      }),
    [isFlipped, isMatched, index, shouldAnimate],
  );

  return (
    <div
      className={`character-card ${customClassNames}`}
      style={{
        animationDelay: index !== undefined ? `${index / 2}s` : undefined,
      }}
    >
      <div className='character-card__face character-card__face--front'>
        {position !== undefined && <span className='character-position'>#{position}</span>}

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
            {character.status}
            {character?.species ? ` - ${character.species}` : ''}
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
