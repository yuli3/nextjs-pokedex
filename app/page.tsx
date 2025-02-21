'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PokemonCard } from '@/components/pokemon-card';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ExternalLink } from 'lucide-react';
import { PokemonFilters } from '@/components/pokemon-filters';
import { Button } from '@/components/ui/button';
import { PokemonWithBasicInfo } from '@/lib/types';

const externalLinks = [
  {
    name: "Official Website",
    url: "https://www.pokemon.com",
  },
  {
    name: "TV & Movies",
    url: "https://watch.pokemon.com",
  },
  {
    name: "Trading Cards",
    url: "https://tcg.pokemon.com",
  },
  {
    name: "Events",
    url: "https://www.pokemon.com/us/play-pokemon",
  },
];

export default function Home() {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList();

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortOrder, setSortOrder] = useState('id');

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const filteredPokemon = useMemo(() => {
    if (!data?.pages) return [];

    let filtered = data.pages.flat() as PokemonWithBasicInfo[];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchLower) ||
          pokemon.id.toString().includes(searchLower)
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some(({ type }) => type.name === selectedType)
      );
    }

    return [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case 'id':
          return a.id - b.id;
        case 'id-desc':
          return b.id - a.id;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [data?.pages, search, selectedType, sortOrder]);

  if (isError) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load Pokémon data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-yellow-300 to-blue-500 bg-clip-text text-transparent">
              Pokédex ✨
            </h1>
            <div className="flex gap-4">
              {externalLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <PokemonFilters
          search={search}
          onSearchChange={setSearch}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        {filteredPokemon.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 mt-8">
            No Pokémon found matching your criteria.
          </div>
        )}

        <div ref={ref} className="flex justify-center items-center h-20 mt-4">
          {(isLoading || isFetchingNextPage) && (
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          )}
        </div>
      </div>
    </main>
  );
}