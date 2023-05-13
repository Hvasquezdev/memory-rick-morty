import { create } from 'zustand';
import { Character } from '../hooks/useCharactersByIds';

interface CharactersState {
  characters: Character[];
}

interface CharactersStore extends CharactersState {
  setCharacters: (characters: Character[]) => void;
}

const initialState: CharactersState = {
  characters: [],
};

const useCharactersStore = create<CharactersStore>((set) => ({
  ...initialState,

  setCharacters(characters) {
    set({
      characters,
    });
  },
}));

export { useCharactersStore };
