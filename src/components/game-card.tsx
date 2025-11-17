
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`} className="group block">
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 hover:bg-card">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={game.coverImage.url}
              alt={game.coverImage.alt}
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint={game.coverImage.hint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <h3 className="font-headline text-xl font-bold">{game.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{game.description}</p>
        </CardContent>
        <CardFooter className="p-4 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{game.genre}</Badge>
            <Badge
              className={cn(
                'border-transparent',
                game.difficulty === 'Easy' && 'bg-green-600/20 text-green-300 border-green-500/30',
                game.difficulty === 'Medium' && 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30',
                game.difficulty === 'Hard' && 'bg-red-600/20 text-red-300 border-red-500/30',
                game.difficulty === 'Expert' && 'bg-purple-600/20 text-purple-300 border-purple-500/30'
              )}
            >
              {game.difficulty}
            </Badge>
          </div>
           <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
        </CardFooter>
      </Card>
    </Link>
  );
}
