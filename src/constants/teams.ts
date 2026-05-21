import { Character } from '../hooks/useCharactersByIds';

export const CHARLIES_TEAM: Partial<Character>[] = [
  {
    name: 'Diego',
    status: 'Backend',
    species: 'Preguntón',
    offDays: {
      start: '2025-04-17',
      end: '2025-04-25',
    },
  },
  {
    name: 'Angel',
    status: 'Backend',
    species: 'La maquina troncoso',
    offDays: {
      start: '2025-06-05',
      end: '2025-07-02',
    },
  },
  {
    name: 'Marcela',
    status: 'Backend',
    species: '',
    offDays: {
      start: '2025-04-17',
      end: '2025-04-25',
    },
  },
  {
    name: 'Hector',
    status: 'Frontend',
    species: 'Veloz',
  },
];

export const X_AI_TEAM: Partial<Character>[] = [
  {
    name: 'Jessika',
    status: 'Software Engineer',
    species: '',
  },
  {
    name: 'David',
    status: 'Software Engineer',
    species: '',
  },
  {
    name: 'Daniel',
    status: 'AI Software Engineer',
    species: '',
  },
  {
    name: 'Rolo',
    status: 'Software Engineer',
    species: '',
  },
  {
    name: 'Rodrigo',
    status: 'AI Software Engineer',
    species: '',
  },
  {
    name: 'Arturo',
    status: 'AI Software Engineer',
    species: '',
  },
  {
    name: 'Jose',
    status: 'AI Software Engineer',
    species: '',
  },
];

export const TEAMS: Record<string, Partial<Character>[]> = {
  CHARLIES: CHARLIES_TEAM,
  X_AI: X_AI_TEAM,
};

export const TEAMS_LABEL: Record<keyof typeof TEAMS, string> = {
  CHARLIES: 'Equipo Charlies',
  X_AI: 'Equipo X + AI',
};