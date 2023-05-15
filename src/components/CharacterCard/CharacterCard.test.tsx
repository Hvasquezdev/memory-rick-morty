import { it, describe, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CharacterCard from '.';
import { Character } from '../../hooks/useCharactersByIds';

const mockCharacter: Character = {
  id: 109,
  image: 'https://rickandmortyapi.com/api/character/avatar/109.jpeg',
  name: 'Duck With Muscles',
  status: 'Dead',
  species: 'Alien',
};

describe('CharacterCard', () => {
  it('should render', () => {
    render(<CharacterCard character={mockCharacter} />);
  });

  it('should show character name', () => {
    render(<CharacterCard character={mockCharacter} />);

    screen.getByText(mockCharacter.name);
  });

  it('should show character custom status', () => {
    render(<CharacterCard character={mockCharacter} />);

    const customStatusText = `${mockCharacter.status} - ${mockCharacter.species}`;
    screen.getByText(customStatusText);
  });

  it('should has correct image src', () => {
    render(<CharacterCard character={mockCharacter} />);

    const img = screen.getByAltText(mockCharacter.name) as HTMLImageElement;
    expect(img.src).toMatch(mockCharacter.image);
  });

  it('should has flipped className', () => {
    const { container } = render(<CharacterCard character={mockCharacter} isFlipped />);
    const cardEl = container.getElementsByClassName('character-card')[0];

    expect(cardEl.className).toMatch(/flipped/);
  });

  it('should has matched className', () => {
    const { container } = render(<CharacterCard character={mockCharacter} isMatched />);
    const cardEl = container.getElementsByClassName('character-card')[0];

    expect(cardEl.className).toMatch(/matched/);
  });

  it('should call onCardBackClick when click on back face', () => {
    const mockCardClick = vi.fn();

    const { container } = render(
      <CharacterCard character={mockCharacter} onBackFaceClick={mockCardClick} />,
    );
    const cardBackFace = container.getElementsByClassName('character-card__face--back')[0];

    fireEvent.click(cardBackFace);
    expect(mockCardClick).toBeCalled();
  });
});
