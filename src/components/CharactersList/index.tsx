import { ReactNode } from 'react';
import './CharactersList.scss';

interface CharactersListProps {
  children: ReactNode;
}

const CharactersList = ({ children }: CharactersListProps) => {
  return <div className='characters-list'>{children}</div>;
};

export default CharactersList;
