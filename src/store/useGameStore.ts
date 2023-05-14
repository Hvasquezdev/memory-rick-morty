import { create } from 'zustand';

interface GameState {
  isPlaying: boolean;
  isWinner: boolean;
  turnsPlayed: number;
}

interface GameStore extends GameState {
  setIsPlaying: (isPlaying: boolean) => void;
  setIsWinner: (isWinner: boolean) => void;
  setTurnsPlayed: (turns: number) => void;
}

const initialState: GameState = {
  isPlaying: false,
  isWinner: false,
  turnsPlayed: 0,
};

const useGameStore = create<GameStore>((set) => ({
  ...initialState,

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
