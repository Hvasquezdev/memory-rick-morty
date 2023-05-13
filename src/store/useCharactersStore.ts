import { create } from 'zustand';
import { Character } from '../hooks/useCharactersByIds';

interface CharactersState {
  characters: Character[];
  loadingCharacters: boolean;
}

interface CharactersStore extends CharactersState {
  setCharacters: (characters: Character[]) => void;
  setLoadingCharacters: (isLoading: boolean) => void;
}

const initialState: CharactersState = {
  characters: [],
  loadingCharacters: true,
};

const useCharactersStore = create<CharactersStore>((set) => ({
  ...initialState,

  setCharacters(characters) {
    set({
      characters,
    });
  },

  setLoadingCharacters(isLoading) {
    set({
      loadingCharacters: isLoading,
    });
  },
}));

export { useCharactersStore };
