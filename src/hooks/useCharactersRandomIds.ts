import { useMemo } from 'react';
import { ApolloError, gql, useQuery } from '@apollo/client';
import { getRandomUniqueNumbers } from '../utils';

interface UseCharactersRandomIds {
  ids: number[];
  loading: boolean;
  error: ApolloError | undefined;
}

const CHARACTER_COUNT_QUERY = gql`
  {
    characters {
      info {
        count
      }
    }
  }
`;

const useCharactersRandomIds = (): UseCharactersRandomIds => {
  const { data, loading, error } = useQuery(CHARACTER_COUNT_QUERY);
  const count = data?.characters.info.count || 0;

  const ids = useMemo(() => getRandomUniqueNumbers(count), [count]);

  return {
    ids,
    loading,
    error,
  };
};

export { useCharactersRandomIds };
