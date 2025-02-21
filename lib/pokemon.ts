import { PokemonListResponse, Pokemon, PokemonWithBasicInfo, PokemonSpecies, EvolutionChain } from '@/lib/types';

const API_BASE = 'https://pokeapi.co/api/v2';
const LIMIT = 20;

export async function getPokemonList(offset = 0): Promise<PokemonListResponse> {
  const response = await fetch(
    `${API_BASE}/pokemon?limit=${LIMIT}&offset=${offset}`
  );
  return response.json();
}

export async function getPokemonDetails(
  nameOrId: string | number
): Promise<Pokemon> {
  const response = await fetch(`${API_BASE}/pokemon/${nameOrId}`);
  return response.json();
}

export async function getPokemonSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  const response = await fetch(`${API_BASE}/pokemon-species/${nameOrId}`);
  return response.json();
}

export async function getEvolutionChain(url: string): Promise<EvolutionChain> {
  const response = await fetch(url);
  return response.json();
}

export async function getPokemonWithBasicInfo(
  nameOrId: string | number
): Promise<PokemonWithBasicInfo> {
  const pokemon = await getPokemonDetails(nameOrId);
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprites: pokemon.sprites,
    types: pokemon.types,
  };
}