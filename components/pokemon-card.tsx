'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PokemonWithBasicInfo } from '@/lib/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { typeColors } from '@/lib/constants';
import { PokemonDetails } from './pokemon-details';
import { useState } from 'react';

interface PokemonCardProps {
  pokemon: PokemonWithBasicInfo;
  variant?: 'default' | 'golden';
}

export function PokemonCard({ pokemon, variant = 'default' }: PokemonCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isGolden = variant === 'golden';
  const mainType = pokemon.types[0].type.name;

  return (
    <>
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-300 cursor-pointer bg-gray-900/50 hover:bg-gray-800/50 border-gray-800 hover:-translate-y-2 hover:scale-105',
          isGolden && 'bg-gradient-to-r from-yellow-500/20 via-yellow-300/20 to-yellow-500/20 border-yellow-500/50',
          !isGolden && `hover:border-${typeColors[mainType].bg.replace('bg-', '')}`
        )}
        onClick={() => setShowDetails(true)}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="p-6">
          <div className="relative w-full aspect-square mb-4 transform transition-transform duration-500 group-hover:scale-110">
            <div className={cn(
              "absolute inset-0 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity",
              typeColors[mainType].bg
            )} />
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <h3 className="text-lg font-semibold capitalize mb-2 text-white group-hover:text-white/90">
            #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
          </h3>
          <div className="flex gap-2">
            {pokemon.types.map(({ type }) => (
                <Badge
                  key={type.name}
                  className={cn(
                    'capitalize opacity-90 group-hover:opacity-100 transition-opacity ',
                    typeColors[type.name].badge
                  )}
                >
                  {type.name}
                </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <PokemonDetails
        pokemonId={pokemon.id}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}