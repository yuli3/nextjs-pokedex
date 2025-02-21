'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RandomPokemon } from '@/components/random-pokemon';
import { typeColors } from '@/lib/constants';

interface PokemonFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
}

export function PokemonFilters({
  search,
  onSearchChange,
  selectedType,
  onTypeChange,
  sortOrder,
  onSortChange,
}: PokemonFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
        />
      </div>
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-white">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all" className="text-white">All types</SelectItem>
          {Object.keys(typeColors).map((type) => (
            <SelectItem 
              key={type} 
              value={type}
              className="text-white capitalize flex items-center"
            >
              <div className={`w-6 h-6 rounded-full mr-2 ${typeColors[type].bg} flex items-center justify-center`}>
                <span className={`text-xs ${typeColors[type].text}`}>{type.charAt(0).toUpperCase()}</span>
              </div>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-white">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="id" className="text-white">Number (Ascending)</SelectItem>
          <SelectItem value="id-desc" className="text-white">Number (Descending)</SelectItem>
          <SelectItem value="name" className="text-white">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc" className="text-white">Name (Z-A)</SelectItem>
        </SelectContent>
      </Select>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-yellow-500 hover:via-red-600 hover:to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Find My Pokémon
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-900/95 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Your Special Pokémon ✨
            </DialogTitle>
          </DialogHeader>
          <RandomPokemon />
        </DialogContent>
      </Dialog>
    </div>
  );
}