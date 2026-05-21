import { ApolloError, gql, useLazyQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { TEAMS } from '../constants/teams';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  offDays?: {
    // format: 'YYYY-MM-DD'
    start: string;
    // format: 'YYYY-MM-DD'
    end: string;
    label?: string;
  };
  isOffDay?: boolean;
}

interface UseCharactersByIds {
  characters: Character[];
  charactersOffDays: Character[];
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

const useCharactersByIds = (
  ids: Array<number> = [],
  team: keyof typeof TEAMS = 'CHARLIES',
): UseCharactersByIds => {
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
    const characters = (data?.charactersByIds || []) as Character[];

    return characters?.map((character, index) => {
      const devCharacter = TEAMS[team]?.[index];

      const isInOffDaysRange =
        devCharacter?.offDays &&
        dayjs().isSameOrAfter(dayjs(devCharacter.offDays?.start), 'day') &&
        dayjs().isSameOrBefore(dayjs(devCharacter.offDays?.end), 'day');

      return {
        ...character,
        ...devCharacter,
        isOffDay: isInOffDaysRange,
      };
    });
  }, [data?.charactersByIds]);

  const activeCharacters = useMemo(() => {
    const active: Character[] = [];
    const inOffDays: Character[] = [];

    charactersByIds.forEach((character) => {
      if (character.isOffDay) {
        inOffDays.push(character);
      } else {
        active.push(character);
      }
    });

    return {
      active,
      inOffDays,
    };
  }, [charactersByIds]);

  return {
    characters: activeCharacters.active,
    charactersOffDays: activeCharacters.inOffDays,
    loading,
    error,
  };
};

export { useCharactersByIds };
