'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails, getPokemonSpecies, getEvolutionChain } from '@/lib/pokemon';
import { Loader2, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { typeColors } from '@/lib/constants';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface PokemonDetailsProps {
  pokemonId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PokemonDetails({ pokemonId, open, onOpenChange }: PokemonDetailsProps) {
  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ['pokemon-details', pokemonId],
    queryFn: () => getPokemonDetails(pokemonId),
    enabled: open,
  });

  const { data: species, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ['pokemon-species', pokemonId],
    queryFn: () => getPokemonSpecies(pokemonId),
    enabled: open,
  });

  const { data: evolution } = useQuery({
    queryKey: ['evolution-chain', species?.evolution_chain.url],
    queryFn: () => getEvolutionChain(species!.evolution_chain.url),
    enabled: !!species?.evolution_chain.url,
  });

  const isLoading = isLoadingPokemon || isLoadingSpecies;

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900/95 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold capitalize bg-gradient-to-r from-red-500 via-yellow-300 to-blue-500 bg-clip-text text-transparent">
            {pokemon?.name} #{pokemon?.id.toString().padStart(3, '0')}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 text-white"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative w-full md:w-1/2 aspect-square bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                <Image
                  src={pokemon!.sprites.other['official-artwork'].front_default}
                  alt={pokemon!.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
              
              <div className="flex-1 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h3 className="text-xl font-semibold mb-3">Types</h3>
                  <div className="flex gap-2">
                    {pokemon?.types.map(({ type }) => (
                      <Badge
                        key={type.name}
                        className={cn('capitalize text-lg py-1 px-4 ', typeColors[type.name].badge)}
                      >
                        {type.name}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3">Basic Info</h3>
                  <dl className="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg">
                    <dt className="font-medium text-gray-400">Height</dt>
                    <dd className="text-white">{(pokemon!.height / 10).toFixed(1)}m</dd>
                    <dt className="font-medium text-gray-400">Weight</dt>
                    <dd className="text-white">{(pokemon!.weight / 10).toFixed(1)}kg</dd>
                    <dt className="font-medium text-gray-400">Category</dt>
                    <dd className="capitalize text-white">
                      {species?.genera.find(g => g.language.name === 'en')?.genus}
                    </dd>
                    <dt className="font-medium text-gray-400">Base XP</dt>
                    <dd className="text-white">{pokemon!.base_experience}</dd>
                  </dl>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-3">Stats</h3>
                  <div className="space-y-3 bg-gray-800/50 p-4 rounded-lg">
                    {pokemon?.stats.map(({ base_stat, stat }, index) => (
                      <div key={stat.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize text-gray-400">
                            {stat.name.replace('-', ' ')}
                          </span>
                          <span className="font-medium text-white">{base_stat}</span>
                        </div>
                        <motion.div
                          className="h-2 bg-gray-700 rounded-full overflow-hidden"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-300"
                            initial={{ width: 0 }}
                            animate={{ width: `${(base_stat / 255) * 100}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                          />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {evolution?.chain && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">Evolution Chain</h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2 bg-gray-800/50 rounded-lg p-2">
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.chain.species.url.split('/')[6]}.png`}
                        alt={evolution.chain.species.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm capitalize">{evolution.chain.species.name}</span>
                  </div>
                  {evolution.chain.evolves_to.map((evo1) => (
                    <div key={evo1.species.name} className="flex flex-wrap items-center">
                      <ChevronRight className="mx-2 text-gray-500" />
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-2 bg-gray-800/50 rounded-lg p-2">
                          <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo1.species.url.split('/')[6]}.png`}
                            alt={evo1.species.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm capitalize">{evo1.species.name}</span>
                      </div>
                      {evo1.evolves_to.map((evo2) => (
                        <div key={evo2.species.name} className="flex items-center">
                          <ChevronRight className="mx-2 text-gray-500" />
                          <div className="text-center">
                            <div className="relative w-24 h-24 mx-auto mb-2 bg-gray-800/50 rounded-lg p-2">
                              <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo2.species.url.split('/')[6]}.png`}
                                alt={evo2.species.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="text-sm capitalize">{evo2.species.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <Separator className="bg-gray-800" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-300 bg-gray-800/50 p-4 rounded-lg leading-relaxed">
                {species?.flavor_text_entries
                  .find(entry => entry.language.name === 'en')
                  ?.flavor_text.replace(/[\n\f]/g, ' ')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}