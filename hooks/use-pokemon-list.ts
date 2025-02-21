'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemonWithBasicInfo } from '@/lib/pokemon';
import { PokemonWithBasicInfo } from '@/lib/types';

export function usePokemonList() {
  return useInfiniteQuery<PokemonWithBasicInfo[]>({
    queryKey: ['pokemon-list'],
    queryFn: async ({ pageParam }) => {
      const { results } = await getPokemonList(pageParam as any);
      const pokemonDetails = await Promise.all(
        results.map((pokemon) => getPokemonWithBasicInfo(pokemon.name))
      );
      return pokemonDetails;
    },
    initialPageParam: 0,
    getNextPageParam: (_, pages) => pages.length * 20,
    staleTime: 60 * 1000, // 1 minute
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}