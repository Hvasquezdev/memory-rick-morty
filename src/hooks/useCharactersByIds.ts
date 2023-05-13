import { ApolloError, gql, useLazyQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

export interface Character {
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
      image
      name
      status
      species
    }
  }
`;

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

  return {
    characters: data?.charactersByIds || [],
    loading,
    error,
  };
};

export { useCharactersByIds };
