"use client";

import { useState } from 'react';
import { GameCard } from '@/components/game-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { games } from '@/lib/data';
import { Game } from '@/lib/types';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const genres = ['All', 'Sci-Fi', 'Cyberpunk', 'Fantasy', 'Strategy'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredGames = games.filter((game) => {
    return (
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === 'All' || game.genre === selectedGenre) &&
      (selectedDifficulty === 'All' || game.difficulty === selectedDifficulty)
    );
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Explore Our Games</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Dive into our collection of unique games. Use the filters to find your next adventure.
        </p>
      </div>

      <div className="mt-8 md:mt-12 p-4 border rounded-lg bg-card sticky top-14 z-40 backdrop-blur-sm bg-background/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre === 'All' ? 'All Genres' : genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty === 'All' ? 'All Difficulties' : difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredGames.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-semibold">No games found.</p>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
