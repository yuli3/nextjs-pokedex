'use client';

import { useQuery } from '@tanstack/react-query';
import { getPokemonWithBasicInfo } from '@/lib/pokemon';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';
import { PokemonCard } from './pokemon-card';
import { useState } from 'react';
import { Button } from './ui/button';

export function RandomPokemon() {
  const [randomId, setRandomId] = useState(() => Math.floor(Math.random() * 898) + 1);

  const { data: pokemon, isLoading, refetch } = useQuery({
    queryKey: ['random-pokemon', randomId],
    queryFn: () => getPokemonWithBasicInfo(randomId),
  });

  const handleReroll = () => {
    setRandomId(Math.floor(Math.random() * 898) + 1);
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={randomId}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-50 animate-pulse rounded-lg" />
            {pokemon && <PokemonCard pokemon={pokemon} variant="golden" />}
          </motion.div>
        </AnimatePresence>
      )}
      
      <div className="flex justify-center">
        <Button
          onClick={handleReroll}
          className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-yellow-500 hover:via-red-600 hover:to-pink-600 text-white font-semibold"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}