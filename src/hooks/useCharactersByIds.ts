import { ApolloError, gql, useLazyQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface UseCharactersByIds {
  characters: Character[];
  loading: boolean;
  error: ApolloError | undefined;
}

const CHARACTER_QUERY = gql`
  query CharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      image
      name
      status
      species
    }
  }
`;

const devsData = [
  {
    name: 'Diego',
    status: 'Backend',
    species: 'Preguntón',
  },
  {
    name: 'Marcela',
    status: 'Backend',
    species: '',
  },
  {
    name: 'Angel',
    status: 'Backend',
    species: 'La maquina troncoso',
  },
  {
    name: 'Hector',
    status: 'Frontend',
    species: 'Veloz',
  },
  {
    name: 'Marquitos',
    status: 'Frontend',
    species: '',
  },
];

const useCharactersByIds = (ids: Array<number> = []): UseCharactersByIds => {
  const [getCharacters, { data, loading, error }] = useLazyQuery(CHARACTER_QUERY, {
    variables: {
      ids,
    },
  });

  const shouldGetCharacters = useMemo(
    () => ids.length && !loading && !data && !error,
    [ids, loading, data, error],
  );

  useEffect(() => {
    if (shouldGetCharacters) {
      getCharacters();
    }
  }, [shouldGetCharacters, getCharacters]);

  const charactersByIds = useMemo(() => {
    const characters = (data?.charactersByIds || []) as Character[]

    return characters?.map((character, index) => ({
      ...character,
      name: devsData?.[index].name || character.name,
      status: devsData?.[index].status || "",
      species: devsData?.[index].species || "",
    }))
  }, [data?.charactersByIds]);

  return {
    characters: charactersByIds,
    loading,
    error,
  };
};

export { useCharactersByIds };
