import { create } from 'zustand';
import { Character } from '../hooks/useCharactersByIds';

interface GameState {
  isPlaying: boolean;
  isWinner: boolean;
  turnsPlayed: number;
  characters: Character[];
}

interface GameStore extends GameState {
  setCharacters: (characters: Character[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsWinner: (isWinner: boolean) => void;
  setTurnsPlayed: (turns: number) => void;
}

const initialState: GameState = {
  characters: [],
  isPlaying: false,
  isWinner: false,
  turnsPlayed: 0,
};

const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setCharacters(characters) {
    set({
      characters,
    });
  },

  setIsPlaying(isPlaying) {
    set({
      isPlaying,
    });
  },

  setIsWinner(isWinner) {
    set({
      isWinner,
    });
  },

  setTurnsPlayed(turns) {
    set({
      turnsPlayed: turns,
    });
  },
}));

export { useGameStore };
